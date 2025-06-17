import { Request } from 'express'
import { TokenPayLoad } from '@/models/requests/user.request'
import { User } from '@prisma/client'

declare module 'express' {
  interface Request {
    user?: User
    decode_authorization?: TokenPayLoad
    decode_refresh_token?: TokenPayLoad
    decode_forgot_password_token?: TokenPayLoad
  }
}
