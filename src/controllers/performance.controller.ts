import MSG from '@/constants/msg'
import {
  CreatePerformanceReqBody,
  GetPerformanceReqParams,
  ListPerformanceReqQuery,
  UpdatePerformanceReqBody
} from '@/models/requests/performance.request'
import { RevenueReqQuery } from '@/models/requests/revenue.request'
import { TokenPayLoad } from '@/models/requests/user.request'
import performanceService from '@/services/performance.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const createPerformanceController = async (
  req: Request<ParamsDictionary, any, CreatePerformanceReqBody>,
  res: Response
) => {
  const { user_id } = req.decode_authorization as TokenPayLoad
  const payload = req.body
  const result = await performanceService.createPerformance({ payload, user_id })
  res.json(result)
  return
}

export const updatePerformanceController = async (
  req: Request<ParamsDictionary, any, UpdatePerformanceReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await performanceService.updatePerformance(payload)
  res.json(result)
  return
}

export const getPerformanceController = async (
  req: Request<GetPerformanceReqParams, any, any, RevenueReqQuery>,
  res: Response
) => {
  const { id } = req.params
  const reqQuery = req.query
  const {
    performance,
    revenueInput,
    revenueOutput,
    totalRevenueInput,
    totalRevenueOutput,
    inputPage,
    outputPage,
    inputLimit,
    outputLimit
  } = await performanceService.getPerformance({ id, payload: reqQuery })
  res.json({
    message: MSG.GET_PERFORMANCE_SUCCESS,
    data: {
      performance,
      revenueInput,
      revenueOutput,
      totalRevenueInput,
      totalRevenueOutput,
      inputPage,
      outputPage,
      inputLimit,
      outputLimit
    }
  })
  return
}

export const getListPerformanceController = async (
  req: Request<ParamsDictionary, any, any, ListPerformanceReqQuery>,
  res: Response
) => {
  const payload = req.query
  const { performances, totalPerformances, limit, page } = await performanceService.performanceList(payload)
  const totalPages = Math.ceil(totalPerformances / limit)
  res.json({
    message: MSG.GET_LIST_PERFORMANCE_SUCCESS,
    data: {
      performances,
      page,
      limit,
      totalPages
    }
  })
  return
}
