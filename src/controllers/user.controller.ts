import MSG from '@/constants/msg'
import { CreateUserReqBody, UserLoginReqBody, UserLogoutReqBody } from '@/models/requests/user.request'
import userService from '@/services/user.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { User } from 'generated/prisma'

export const userLoginController = async (req: Request<ParamsDictionary, any, UserLoginReqBody>, res: Response) => {
  const user = req.user as User
  const result = await userService.login({ user_id: user.id, verify: user.verify })
  res.json({
    message: MSG.LOGIN_SUCCESS,
    data: result
  })
  return
}

export const userLogoutController = async (req: Request<ParamsDictionary, any, UserLogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await userService.logout(refresh_token)
  res.json(result)
  return
}

export const createUserController = async (req: Request<ParamsDictionary, any, CreateUserReqBody>, res: Response) => {
  const { email, password } = req.body
  const result = await userService.createUser({ email, password })
  res.json(result)
  return
}
