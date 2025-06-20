import MSG from '@/constants/msg'
import {
  CreateActivityReqBody,
  GetDetailActivityReqParams,
  GetListActivityReqQuery,
  UpdateActivityReqBody
} from '@/models/requests/activity.request'
import { TokenPayLoad } from '@/models/requests/user.request'
import activityService from '@/services/activity.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const createActivityController = async (
  req: Request<ParamsDictionary, any, CreateActivityReqBody>,
  res: Response
) => {
  const { user_id } = req.decode_authorization as TokenPayLoad
  const payload = req.body
  const result = await activityService.createActivity({ payload, user_id })
  res.json(result)
  return
}

export const updateActivityController = async (
  req: Request<ParamsDictionary, any, UpdateActivityReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await activityService.updateActivity(payload)
  res.json(result)
  return
}

export const getDetailActivityController = async (req: Request<GetDetailActivityReqParams>, res: Response) => {
  const { id } = req.params
  const result = await activityService.getDetailActivity(id)
  res.json({
    message: MSG.GET_DETAIL_ACTIVITY_SUCCESS,
    data: result
  })
  return
}

export const getListActivityController = async (
  req: Request<ParamsDictionary, any, any, GetListActivityReqQuery>,
  res: Response
) => {
  const payload = req.query
  const { activities, totalActivities, limit, page } = await activityService.getListActivity(payload)
  const totalPages = Math.ceil(totalActivities / limit)
  res.json({
    message: MSG.GET_LIST_ACTIVITY_SUCCESS,
    data: {
      activities,
      page,
      limit,
      totalPages
    }
  })
}
