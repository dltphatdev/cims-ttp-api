import MSG from '@/constants/msg'
import {
  ChangePasswordReqBody,
  CreateUserReqBody,
  GetUserDetailReqParams,
  RefreshTokenReqBody,
  ResetPasswordReqBody,
  TokenPayLoad,
  UpdateProfileReqBody,
  UpdateUserReqBody,
  UserListReqQuery,
  UserLoginReqBody,
  UserLogoutReqBody
} from '@/models/requests/user.request'
import mediaService from '@/services/media.service'
import userService from '@/services/user.service'
import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const loginController = async (req: Request<ParamsDictionary, any, UserLoginReqBody>, res: Response) => {
  const user = req.user as User
  const result = await userService.login({ user_id: user.id, verify: user.verify, role: user.role })
  res.json({
    message: MSG.LOGIN_SUCCESS,
    data: result
  })
  return
}

export const logoutController = async (req: Request<ParamsDictionary, any, UserLogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await userService.logout(refresh_token)
  res.json(result)
  return
}

export const createUserController = async (req: Request<ParamsDictionary, any, CreateUserReqBody>, res: Response) => {
  const payload = req.body
  const result = await userService.createUser(payload)
  res.json(result)
  return
}

export const updateUserController = async (req: Request<ParamsDictionary, any, UpdateUserReqBody>, res: Response) => {
  const payload = req.body
  const result = await userService.updateUser(payload)
  res.json(result)
  return
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>,
  res: Response
) => {
  const { user_id } = req.decode_authorization as TokenPayLoad
  const { password } = req.body
  const result = await userService.changePassword({ user_id, password })
  res.json(result)
  return
}

export const updateProfileController = async (
  req: Request<ParamsDictionary, any, UpdateProfileReqBody>,
  res: Response
) => {
  const { user_id } = req.decode_authorization as TokenPayLoad
  const payload = req.body
  const result = await userService.updateProfile({ user_id, payload })
  res.json(result)
  return
}

export const uploadAvatarController = async (req: Request, res: Response) => {
  const result = await mediaService.handleUploadImage(req)
  res.json({
    message: MSG.UPLOAD_AVATAR_SUCCESSFULLY,
    data: result
  })
  return
}

export const uploadDocumentController = async (req: Request, res: Response) => {
  const result = await mediaService.handleUploadFiles(req)
  res.json({
    message: MSG.UPLOAD_FILE_SUCCESSFULLY,
    data: result
  })
  return
}

export const getListUserController = async (
  req: Request<ParamsDictionary, any, any, UserListReqQuery>,
  res: Response
) => {
  const payload = req.query
  const { users, totalUsers, limit, page } = await userService.userList(payload)
  const totalPages = Math.ceil(totalUsers / limit)
  res.json({
    message: MSG.GET_LIST_USER_SUCCESS,
    data: {
      users,
      page,
      limit,
      totalPages
    }
  })
  return
}

export const getUserDetailController = async (req: Request<GetUserDetailReqParams>, res: Response) => {
  const id = Number(req.params?.id)
  const user = await userService.getUserDetail(id)
  res.json({
    message: MSG.GET_DETAIL_USER_SUCCESS,
    data: user
  })
  return
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>,
  res: Response
) => {
  const { user_id, exp, verify, role } = req.decode_refresh_token as TokenPayLoad
  const { refresh_token } = req.body
  const result = await userService.refreshToken({ user_id, refresh_token, exp, verify, role })
  res.json({
    message: MSG.REFRESH_TOKEN_SUCCESS,
    data: result
  })
  return
}

export const getMeController = async (req: Request, res: Response) => {
  const { user_id } = req.decode_authorization as TokenPayLoad
  const user = await userService.getMe(user_id)
  res.json({
    message: MSG.GET_ME_SUCCESS,
    data: user
  })
  return
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response
) => {
  const { id, password } = req.body
  const result = await userService.resetPassword({ id, password })
  res.json(result)
  return
}
