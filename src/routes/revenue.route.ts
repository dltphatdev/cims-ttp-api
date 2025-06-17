import { PREFIX_REVENUE } from '@/constants/path'
import {
  createRevenueController,
  getRevenueController,
  updateRevenueController
} from '@/controllers/revenue.controller'
import { filterMiddleware } from '@/middlewares/common.middleware'
import {
  createRevenueValidator,
  getRevenueDetailQueryValidator,
  getRevenueDetailValidator,
  updateRevenueValidator
} from '@/middlewares/revenue.middleware'
import { accessTokenValidator, verifiedUserValidator } from '@/middlewares/user.middleware'
import { UpdateRevenueReqBody } from '@/models/requests/revenue.request'
import { wrapRequestHandler } from '@/utils/handler'
import { Router } from 'express'
const revenueRouter = Router()

/**
 * Description: Create revenue
 * Path: /create
 * Method: POST
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: CreateRevenueReqBody
 * */
revenueRouter.post(
  `${PREFIX_REVENUE}/create`,
  accessTokenValidator,
  verifiedUserValidator,
  createRevenueValidator,
  wrapRequestHandler(createRevenueController)
)

/**
 * Description: Update revenue
 * Path: /update
 * Method: PATCH
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: UpdateRevenueReqBody
 * */
revenueRouter.patch(
  `${PREFIX_REVENUE}/update`,
  accessTokenValidator,
  verifiedUserValidator,
  updateRevenueValidator,
  filterMiddleware<UpdateRevenueReqBody>(['id', 'name', 'description', 'unit_caculate', 'type', 'price', 'quantity']),
  wrapRequestHandler(updateRevenueController)
)

/**
 * Description: Get detail revenue
 * Path: /detail/:id
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request params: { id: string }
 * Request query: { direction: RevenueDirection }
 * */
revenueRouter.get(
  `${PREFIX_REVENUE}/detail/:id`,
  accessTokenValidator,
  verifiedUserValidator,
  getRevenueDetailValidator,
  getRevenueDetailQueryValidator,
  wrapRequestHandler(getRevenueController)
)

export default revenueRouter
