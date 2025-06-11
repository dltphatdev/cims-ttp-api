import { Router } from 'express'
import { PREFIX_USER } from '@/constants/path'
import {
  changePasswordController,
  createUserController,
  getListUserController,
  getMeController,
  getUserDetailController,
  loginController,
  logoutController,
  refreshTokenController,
  updateProfileController,
  updateUserController,
  uploadAvatarController
} from '@/controllers/user.controller'
import { filterMiddleware } from '@/middlewares/common.middleware'
import {
  accessTokenValidator,
  createUserValidator,
  refreshTokenValidator,
  updateUserValidator,
  loginValidator,
  userRoleValidator,
  verifiedUserValidator,
  changePasswordValidator,
  updateProfileValidator,
  getUserDetailValidator,
  paginationValidator
} from '@/middlewares/user.middleware'
import { UpdateProfileReqBody, UpdateUserReqBody } from '@/models/requests/user.request'
import { wrapRequestHandler } from '@/utils/handler'

const userRouter = Router()

/**
 * Description: Login User Account
 * Method: POST
 * Path: /login
 * Request body: { email: string; password: string }
 * */
userRouter.post(`${PREFIX_USER}/login`, loginValidator, wrapRequestHandler(loginController))

/**
 * Description: Logout User Account
 * Method: POST
 * Path: /logout
 * Request body: { refresh_token }
 * */
userRouter.post(`${PREFIX_USER}/logout`, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description: Change password user account
 * Method: PUT
 * Path: /change-password
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: { old_password: string; password: string }
 * */
userRouter.put(
  `${PREFIX_USER}/change-password`,
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

/**
 * Description: Update profile user
 * Method: PATCH
 * Path: /profile
 * Request body: { refresh_token }
 * */
userRouter.patch(
  `${PREFIX_USER}/profile`,
  accessTokenValidator,
  verifiedUserValidator,
  updateProfileValidator,
  filterMiddleware<UpdateProfileReqBody>(['address', 'avatar', 'code', 'date_of_birth', 'fullname', 'phone']),
  wrapRequestHandler(updateProfileController)
)

/**
 * Description: Create New User Account with permission Super Admin
 * Method: POST
 * Path: /create
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: { email: string; password: string }
 * */
userRouter.post(
  `${PREFIX_USER}/create`,
  accessTokenValidator,
  verifiedUserValidator,
  // userRoleValidator,
  createUserValidator,
  wrapRequestHandler(createUserController)
)

/**
 * Description: Update User Account with permission Super Admin
 * Method: PATCH
 * Path: /update
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: UpdateUserReqBody
 * */
userRouter.patch(
  `${PREFIX_USER}/update`,
  accessTokenValidator,
  verifiedUserValidator,
  userRoleValidator,
  updateUserValidator,
  filterMiddleware<UpdateUserReqBody>([
    'id',
    'fullname',
    'address',
    'avatar',
    'code',
    'date_of_birth',
    'role',
    'verify',
    'password',
    'phone'
  ]),
  wrapRequestHandler(updateUserController)
)

/**
 * Description: Upload avatar user account
 * Path: /upload-avatar
 * Method: POST
 * Request header: { Authorization: Bearer <access_token> }
 * Request form data: { image: string }
 * */
userRouter.post(
  `${PREFIX_USER}/upload-avatar`,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadAvatarController)
)

/**
 * Description: Get list user account (search with fullname or phone with pagination)
 * Path: /
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request Query: UserListReqQuery
 * */
userRouter.get(
  `${PREFIX_USER}`,
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(getListUserController)
)

/**
 * Description: get user account detail
 * Path: /detail/:id
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request params: id: string
 *  * */
userRouter.get(
  `${PREFIX_USER}/detail/:id`,
  accessTokenValidator,
  verifiedUserValidator,
  // userRoleValidator,
  getUserDetailValidator,
  wrapRequestHandler(getUserDetailController)
)

/*
 * Description: Refresh token when access token is expired
 * Path: /refresh-token
 * Method: POST
 * Request Body: { refresh_token: string }
 */
userRouter.post(`${PREFIX_USER}/refresh-token`, refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Description: Get profile account
 * Path: /me
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * */
userRouter.get(`${PREFIX_USER}/me`, accessTokenValidator, wrapRequestHandler(getMeController))

export default userRouter
