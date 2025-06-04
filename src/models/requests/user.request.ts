import { TokenType } from '@/constants/enum'
import { UserVerifyStatus } from 'generated/prisma'
import { JwtPayload } from 'jsonwebtoken'

export interface TokenPayLoad extends JwtPayload {
  user_id: string
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

export interface CreateUserReqBody {
  email: string
  password: string
}
