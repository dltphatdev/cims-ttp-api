import MSG from '@/constants/msg'
import {
  CreateRevenueReqBody,
  GetRevenueReqParams,
  GetRevenueReqQuery,
  UpdateRevenueReqBody
} from '@/models/requests/revenue.request'
import revenueService from '@/services/revenue.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const createRevenueController = async (
  req: Request<ParamsDictionary, any, CreateRevenueReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await revenueService.createRevenue(payload)
  res.json({
    message: MSG.CREATE_REVENUE_SUCCESS,
    data: result
  })
  return
}

export const updateRevenueController = async (
  req: Request<ParamsDictionary, any, UpdateRevenueReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await revenueService.updateRevenue(payload)
  res.json(result)
  return
}

export const getRevenueController = async (
  req: Request<GetRevenueReqParams, any, any, GetRevenueReqQuery>,
  res: Response
) => {
  const { id } = req.params
  const { direction } = req.query
  const result = await revenueService.getRevenue({ id, direction })
  res.json({
    message: MSG.GET_REVENUE_SUCCESS,
    data: result
  })
  return
}
