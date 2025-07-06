import { PREFIX_PERFORMANCE } from '@/constants/path'
import {
  createPerformanceController,
  getListPerformanceController,
  getPerformanceController,
  updatePerformanceController
} from '@/controllers/performance.controller'
import { filterMiddleware } from '@/middlewares/common.middleware'
import {
  createPerformanceValidator,
  getPerformanceValidator,
  paginationValidator,
  updatePerformanceValidator
} from '@/middlewares/performance.middleware'
import { permissionGetPerformanceDetailValidator } from '@/middlewares/permission.middleware'
import { inputPaginationValidator, outputPaginationValidator } from '@/middlewares/revenue.middleware'
import { accessTokenValidator, verifiedUserValidator } from '@/middlewares/user.middleware'
import { UpdatePerformanceReqBody } from '@/models/requests/performance.request'
import { wrapRequestHandler } from '@/utils/handler'
import { Router } from 'express'

const performanceRouter = Router()

/**
 * Description: Create performance
 * Path: /create
 * Method: POST
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: CreatePerformanceReqBody
 * */

performanceRouter.post(
  `${PREFIX_PERFORMANCE}/create`,
  accessTokenValidator,
  verifiedUserValidator,
  createPerformanceValidator,
  wrapRequestHandler(createPerformanceController)
)

/**
 * Description: Get list performance (search with name)
 * Path: /
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request Query: ListPerformanceReqQuery
 * */
performanceRouter.get(
  `${PREFIX_PERFORMANCE}`,
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(getListPerformanceController)
)

/**
 * Description: Get detail performance
 * Path: /detail/:id
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request params: { id: string }
 * Request query: { input_page?: string; output_page?: string; input_limit?: string; output_limit?: string }
 * */
performanceRouter.get(
  `${PREFIX_PERFORMANCE}/detail/:id`,
  accessTokenValidator,
  verifiedUserValidator,
  getPerformanceValidator,
  inputPaginationValidator,
  outputPaginationValidator,
  permissionGetPerformanceDetailValidator,
  wrapRequestHandler(getPerformanceController)
)

/**
 * Description: Update performance
 * Method: PATCH
 * Path: /update
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: UpdatePerformanceReqBody
 * */
performanceRouter.patch(
  `${PREFIX_PERFORMANCE}/update`,
  accessTokenValidator,
  verifiedUserValidator,
  updatePerformanceValidator,
  filterMiddleware<UpdatePerformanceReqBody>([
    'id',
    'name',
    'customer_id',
    'note',
    'status',
    'operating_cost',
    'customer_care_cost',
    'commission_cost',
    'diplomatic_cost',
    'reserve_cost',
    'customer_cost'
  ]),
  wrapRequestHandler(updatePerformanceController)
)

export default performanceRouter
