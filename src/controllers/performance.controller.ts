import MSG from '@/constants/msg'
import {
  CreatePerformanceReqBody,
  GetPerformanceReqParams,
  ListPerformanceReqQuery,
  UpdatePerformanceReqBody
} from '@/models/requests/performance.request'
import performanceService from '@/services/performance.service'
import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const createPerformanceController = async (
  req: Request<ParamsDictionary, any, CreatePerformanceReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await performanceService.createPerformance(payload)
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

export const getPerformanceController = async (req: Request<GetPerformanceReqParams>, res: Response) => {
  const { id } = req.params
  const performance = await performanceService.getPerformance(id)
  res.json({
    message: MSG.GET_PERFORMANCE_SUCCESS,
    data: performance
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
