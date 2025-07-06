import { PREFIX_ACTIVITY } from '@/constants/path'
import {
  createActivityController,
  getDetailActivityController,
  getListActivityController,
  updateActivityController
} from '@/controllers/activity.controller'
import {
  createActivityValidator,
  getDetailActivityValidator,
  paginationValidator,
  updateActivityValidator
} from '@/middlewares/activity.middleware'
import { filterMiddleware } from '@/middlewares/common.middleware'
import { permissionActivityDetailValidator } from '@/middlewares/permission.middleware'
import { accessTokenValidator, verifiedUserValidator } from '@/middlewares/user.middleware'
import { UpdateActivityReqBody } from '@/models/requests/activity.request'
import { wrapRequestHandler } from '@/utils/handler'
import { Router } from 'express'

const activityRouter = Router()

/**
 * Description: Create activity
 * Path: /create
 * Method: POST
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: CreateActivityReqBody
 * */
activityRouter.post(
  `${PREFIX_ACTIVITY}/create`,
  accessTokenValidator,
  verifiedUserValidator,
  createActivityValidator,
  wrapRequestHandler(createActivityController)
)

/**
 * Description: Update activity
 * Method: PATCH
 * Path: /update
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: UpdateActivityReqBody
 * */
activityRouter.put(
  `${PREFIX_ACTIVITY}/update`,
  accessTokenValidator,
  verifiedUserValidator,
  updateActivityValidator,
  filterMiddleware<UpdateActivityReqBody>([
    'name',
    'customer_id',
    'contact_name',
    'address',
    'phone',
    'status',
    'time_start',
    'time_end',
    'content',
    'id',
    'assign_at'
  ]),
  wrapRequestHandler(updateActivityController)
)

/**
 * Description: Get list activity (search with name)
 * Path: /
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request Query: GetListActivityReqQuery
 * */
activityRouter.get(
  PREFIX_ACTIVITY,
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(getListActivityController)
)

/**
 * Description: Get detail activity
 * Path: /detail/:id
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request params: { id: string }
 * */
activityRouter.get(
  `${PREFIX_ACTIVITY}/detail/:id`,
  accessTokenValidator,
  verifiedUserValidator,
  getDetailActivityValidator,
  permissionActivityDetailValidator,
  wrapRequestHandler(getDetailActivityController)
)

export default activityRouter
