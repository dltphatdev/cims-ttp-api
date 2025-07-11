import { JwtPayload } from 'jsonwebtoken'
import { Query, ParamsDictionary } from 'express-serve-static-core'
import { TokenType } from '@/constants/enum'
import { UserRole, UserVerifyStatus } from '@prisma/client'

export interface GetUserDetailReqParams extends ParamsDictionary {
  id: string
}

export interface Pagination extends Query {
  page?: string
  limit?: string
}

export interface UserListReqQuery extends Pagination {
  fullname?: string
  phone?: string
}

export interface TokenPayLoad extends JwtPayload {
  user_id: number
  role: UserRole
  token_type: TokenType
  verify: UserVerifyStatus
  iat: number
  exp: number
}

export interface UserLoginReqBody {
  email: string
  password: string
}

export interface UserLogoutReqBody {
  refresh_token: string
}

export interface ResetPasswordReqBody {
  id: number
  password: string
}

export interface CreateUserReqBody {
  email: string
  password: string
  fullname?: string
  avatar?: string
  address?: string
  phone?: string
  code?: string
  date_of_birth?: string
  role?: UserRole
}

export interface UpdateProfileReqBody {
  fullname?: string
  avatar?: string
  address?: string
  phone?: string
  code?: string
  date_of_birth?: string
}

export interface UpdateUserReqBody {
  id: number
  fullname?: string
  avatar?: string
  address?: string
  verify?: UserVerifyStatus
  phone?: string
  code?: string
  date_of_birth?: string
  role?: UserRole
}

export interface ChangePasswordReqBody {
  old_password: string
  password: string
}

export interface RefreshTokenReqBody {
  refresh_token: string
}
