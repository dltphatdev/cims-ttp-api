import { CONFIG_ENV } from '@/constants/config'
import { TokenType } from '@/constants/enum'
import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreateUserReqBody,
  UpdateProfileReqBody,
  UpdateUserReqBody,
  UserListReqQuery
} from '@/models/requests/user.request'
import { convertToSeconds } from '@/utils/common'
import { hashPassword } from '@/utils/crypto'
import { signToken, verifyToken } from '@/utils/jwt'
import { UserVerifyStatus } from 'generated/prisma'

class UserService {
  private signAccessToken({ user_id, verify }: { user_id: number; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
      },
      privateKey: CONFIG_ENV.JWT_ACCESS_TOKEN_SECRET_KEY,
      options: {
        expiresIn: CONFIG_ENV.JWT_ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({ user_id, verify, exp }: { user_id: number; verify: UserVerifyStatus; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          exp
        },
        privateKey: CONFIG_ENV.JWT_REFRESH_TOKEN_SECRET_KEY
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      privateKey: CONFIG_ENV.JWT_REFRESH_TOKEN_SECRET_KEY,
      options: {
        expiresIn: CONFIG_ENV.JWT_REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessTokenRefreshToken({ user_id, verify }: { user_id: number; verify: UserVerifyStatus }) {
    return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })])
  }

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({ token: refresh_token, secretOrPublicKey: CONFIG_ENV.JWT_REFRESH_TOKEN_SECRET_KEY })
  }

  async login({ user_id, verify }: { user_id: number; verify: UserVerifyStatus }) {
    const [access_token, refresh_token] = await this.signAccessTokenRefreshToken({ user_id, verify })
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    const [user] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: user_id
        },
        select: {
          id: true,
          email: true,
          fullname: true,
          verify: true,
          avatar: true,
          address: true,
          phone: true,
          code: true,
          role: true,
          date_of_birth: true,
          created_at: true,
          updated_at: true
        }
      }),
      prisma.refreshToken.create({
        data: {
          token: refresh_token,
          iat: new Date(iat * 1000),
          exp: new Date(exp * 1000),
          user_id
        }
      })
    ])

    const expires_access_token = convertToSeconds(CONFIG_ENV.JWT_ACCESS_TOKEN_EXPIRES_IN)
    const expires_refresh_token = convertToSeconds(CONFIG_ENV.JWT_REFRESH_TOKEN_EXPIRES_IN)
    return {
      access_token,
      refresh_token,
      expires_access_token,
      expires_refresh_token,
      user
    }
  }

  async logout(refresh_token: string) {
    await prisma.refreshToken.delete({
      where: {
        token: refresh_token
      }
    })
    return {
      message: MSG.LOGOUT_SUCCESS
    }
  }

  async createUser({ email, password }: CreateUserReqBody) {
    await prisma.user.create({
      data: {
        email,
        password: hashPassword(password)
      }
    })
    return {
      message: MSG.CREATED_USER_SUCCESS
    }
  }

  async isExistUser(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return Boolean(user)
  }

  async updateUser(payload: UpdateUserReqBody) {
    const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload
    const user = await prisma.user.update({
      where: {
        id: _payload.id
      },
      data: {
        ..._payload,
        password: hashPassword(_payload.password as string)
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        verify: true,
        avatar: true,
        address: true,
        phone: true,
        code: true,
        role: true,
        date_of_birth: true,
        created_at: true,
        updated_at: true
      }
    })
    return {
      message: MSG.UPDATED_USER_SUCCESS,
      user
    }
  }

  async changePassword({ user_id, password }: { user_id: number; password: string }) {
    await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        password: hashPassword(password)
      }
    })
    return {
      message: MSG.CHANGED_PASSWORD_SUCCESSS
    }
  }

  async updateProfile({ user_id, payload }: { user_id: number; payload: UpdateProfileReqBody }) {
    const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload
    const user = await prisma.user.update({
      where: {
        id: user_id
      },
      data: _payload,
      select: {
        id: true,
        email: true,
        fullname: true,
        verify: true,
        avatar: true,
        address: true,
        phone: true,
        code: true,
        role: true,
        date_of_birth: true,
        created_at: true,
        updated_at: true
      }
    })
    return {
      message: MSG.UPDATED_USER_SUCCESS,
      user
    }
  }
  async userList({ user_id, payload }: { user_id: number; payload: UserListReqQuery }) {
    const page = Number(payload?.page) || PAGE
    const limit = Number(payload?.limit) || LIMIT
    // eslint-disable-next-line prefer-const
    let whereCondition: any = {}
    whereCondition.OR = []
    if (payload.fullname) {
      whereCondition.OR.push({
        fullname: {
          contains: payload.fullname.toLocaleLowerCase()
        }
      })
    }
    if (payload.phone) {
      whereCondition.OR.push({
        phone: {
          contains: payload.phone
        }
      })
    }
    whereCondition.id = {
      not: user_id
    }
    console.log(whereCondition)
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        where: whereCondition,
        skip: limit * (page - 1),
        take: limit,
        orderBy: {
          created_at: 'desc'
        }
      }),
      prisma.user.count({ where: whereCondition })
    ])
    return {
      users,
      totalUsers,
      page,
      limit
    }
  }
}

const userService = new UserService()
export default userService
