import { CONFIG_ENV } from '@/constants/config'
import { TokenType } from '@/constants/enum'
import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreateUserReqBody,
  ListDocumentFilesReqQuery,
  UpdateProfileReqBody,
  UpdateUserReqBody,
  UserListReqQuery
} from '@/models/requests/user.request'
import { convertToSeconds } from '@/utils/common'
import { hashPassword } from '@/utils/crypto'
import { signToken, verifyToken } from '@/utils/jwt'
import { UserRole, UserVerifyStatus } from '@prisma/client'

class UserService {
  private signAccessToken({ user_id, verify, role }: { user_id: number; verify: UserVerifyStatus; role: UserRole }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify,
        role
      },
      privateKey: CONFIG_ENV.JWT_ACCESS_TOKEN_SECRET_KEY,
      options: {
        expiresIn: CONFIG_ENV.JWT_ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({
    user_id,
    verify,
    exp,
    role
  }: {
    user_id: number
    verify: UserVerifyStatus
    exp?: number
    role: UserRole
  }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          exp,
          role
        },
        privateKey: CONFIG_ENV.JWT_REFRESH_TOKEN_SECRET_KEY
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify,
        role
      },
      privateKey: CONFIG_ENV.JWT_REFRESH_TOKEN_SECRET_KEY,
      options: {
        expiresIn: CONFIG_ENV.JWT_REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessTokenRefreshToken({
    user_id,
    verify,
    role
  }: {
    user_id: number
    verify: UserVerifyStatus
    role: UserRole
  }) {
    return Promise.all([
      this.signAccessToken({ user_id, verify, role }),
      this.signRefreshToken({ user_id, verify, role })
    ])
  }

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({ token: refresh_token, secretOrPublicKey: CONFIG_ENV.JWT_REFRESH_TOKEN_SECRET_KEY })
  }

  async login({ user_id, verify, role }: { user_id: number; verify: UserVerifyStatus; role: UserRole }) {
    const [access_token, refresh_token] = await this.signAccessTokenRefreshToken({ user_id, verify, role })
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

  async createUser(payload: CreateUserReqBody) {
    const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload
    await prisma.user.create({
      data: {
        ..._payload,
        verify: UserVerifyStatus.Verified,
        password: hashPassword(_payload.password)
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
        updated_at: new Date()
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
      data: user
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
      data: user
    }
  }

  async userList(payload: UserListReqQuery) {
    const page = Number(payload?.page) || PAGE
    const limit = Number(payload?.limit) || LIMIT
    // eslint-disable-next-line prefer-const
    let whereCondition: any = {
      NOT: {
        role: UserRole.SuperAdmin
      }
    }
    if (payload.fullname || payload.phone) {
      whereCondition = {
        OR: []
      }

      if (Array.isArray(payload.fullname)) {
        payload.fullname.forEach((name) => {
          whereCondition.OR.push({
            fullname: {
              contains: name.toLocaleLowerCase()
            }
          })
        })
      } else if (payload.fullname) {
        whereCondition.OR.push({
          fullname: {
            contains: payload.fullname.toLocaleLowerCase()
          }
        })
      }

      if (Array.isArray(payload.phone)) {
        payload.phone.forEach((phone) => {
          whereCondition.OR.push({
            phone: {
              contains: phone.toLocaleLowerCase()
            }
          })
        })
      } else if (payload.phone) {
        whereCondition.OR.push({
          phone: {
            contains: payload.phone.toLocaleLowerCase()
          }
        })
      }
    }
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        where: whereCondition,
        skip: limit * (page - 1),
        take: limit,
        orderBy: {
          created_at: 'asc'
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

  async refreshToken({
    user_id,
    exp,
    refresh_token,
    verify,
    role
  }: {
    user_id: number
    exp: number
    refresh_token: string
    verify: UserVerifyStatus
    role: UserRole
  }) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({
        user_id,
        verify,
        role
      }),
      this.signRefreshToken({ user_id, exp, verify, role }),
      prisma.refreshToken.delete({
        where: {
          token: refresh_token
        }
      })
    ])
    const decode_refresh_token = await this.decodeRefreshToken(new_refresh_token)
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
          user_id,
          token: new_refresh_token,
          iat: new Date(decode_refresh_token.iat * 1000),
          exp: new Date(decode_refresh_token.exp * 1000)
        }
      })
    ])

    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token,
      user
    }
  }

  async getUserDetail(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  }

  async getMe(user_id: number) {
    const user = await prisma.user.findUnique({
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
    })
    return user
  }

  async resetPassword({ id, password }: { id: number; password: string }) {
    await prisma.user.update({
      where: {
        id
      },
      data: {
        password: hashPassword(password)
      }
    })
    return {
      message: MSG.RESET_PASSWORD_SUCCESS
    }
  }

  async listDocumentFiles(payload: ListDocumentFilesReqQuery) {
    const page = Number(payload?.page) || PAGE
    const limit = Number(payload?.limit) || LIMIT
    let whereCondition: any = {
      NOT: {
        user_id: null
      }
    }

    if (payload.filename) {
      const filenameConditions = []

      if (Array.isArray(payload.filename)) {
        for (const item of payload.filename) {
          filenameConditions.push({
            filename: {
              contains: item.toLocaleLowerCase()
            }
          })
        }
      } else {
        filenameConditions.push({
          filename: {
            contains: payload.filename.toLocaleLowerCase()
          }
        })
      }

      whereCondition = {
        AND: [
          whereCondition,
          {
            OR: filenameConditions
          }
        ]
      }
    }

    const [galleries, totalGalleries] = await Promise.all([
      prisma.gallery.findMany({
        where: whereCondition,
        skip: limit * (page - 1),
        take: limit,
        orderBy: {
          created_at: 'asc'
        },
        select: {
          id: true,
          filename: true,
          created_at: true,
          user: {
            select: {
              id: true,
              role: true,
              fullname: true
            }
          }
        }
      }),
      prisma.gallery.count({ where: whereCondition })
    ])
    return {
      galleries,
      totalGalleries,
      page,
      limit
    }
  }

  async createDocumentFiles({ payload, user_id }: { payload: { attachments: string[] }; user_id: number }) {
    const { attachments } = payload
    if (attachments?.length) {
      await Promise.all(
        attachments.map((attachment) =>
          prisma.gallery.create({
            data: {
              user_id,
              filename: attachment
            }
          })
        )
      )
    }
    return {
      message: MSG.UPLOAD_DOCUMENTS_SUCCESSFULLY
    }
  }
}

const userService = new UserService()
export default userService
