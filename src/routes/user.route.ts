import { PREFIX_USER } from '@/constants/path'
import { createUserController, userLoginController, userLogoutController } from '@/controllers/user.controller'
import {
  accessTokenValidator,
  refreshTokenValidator,
  userLoginValidator,
  verifiedUserValidator
} from '@/middlewares/user.middleware'
import { wrapReqquestHandler } from '@/utils/handler'
import { Router } from 'express'
const userRouter = Router()

/**
 * Description: Login User Account
 * Method: POST
 * Path: /login
 * Request body: { email: string; password: string }
 * */
userRouter.post(`${PREFIX_USER}/login`, userLoginValidator, wrapReqquestHandler(userLoginController))

/**
 * Description: Logout User Account
 * Method: POST
 * Path: /logout
 * Request body: { refresh_token }
 * */
userRouter.post(`${PREFIX_USER}/logout`, refreshTokenValidator, wrapReqquestHandler(userLogoutController))

/**
 * Description: Create New User Account
 * Method: POST
 * Path: /
 * Request body: { email: string; password: string }
 * */
userRouter.post(PREFIX_USER, accessTokenValidator, verifiedUserValidator, wrapReqquestHandler(createUserController))

export default userRouter
