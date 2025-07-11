import { Router } from 'express'
import { PREFIX_CUSTOMER } from '@/constants/path'
import { wrapRequestHandler } from '@/utils/handler'
import {
  createCustomerController,
  getCustomerDetailController,
  getListCustomerController,
  updateCustomerCompanyController,
  updateCustomerPersonalController,
  uploadFilesCustomerController
} from '@/controllers/customer.controller'
import { accessTokenValidator, verifiedUserValidator } from '@/middlewares/user.middleware'
import {
  createCustomerValidator,
  getCustomerDetailValidator,
  paginationValidator,
  updateCustomerCompanyValidator,
  updateCustomerPersonalValidator
} from '@/middlewares/customer.middleware'
import { filterMiddleware } from '@/middlewares/common.middleware'
import { UpdateCustomerCompanyReqBody, UpdateCustomerPersonalReqBody } from '@/models/requests/customer.request'
import { permissionGetDetailCustomerValidator } from '@/middlewares/permission.middleware'
const customerRouter = Router()

/**
 * Description: Create new customer
 * Method: POST
 * Path: /create
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: CreateCustomerReqBody
 * */
customerRouter.post(
  `${PREFIX_CUSTOMER}/create`,
  accessTokenValidator,
  verifiedUserValidator,
  createCustomerValidator,
  wrapRequestHandler(createCustomerController)
)

/**
 * Description: Update customer with type Company
 * Method: PATCH
 * Path: /update-company
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: UpdateCustomerCompanyReqBody
 * */
customerRouter.patch(
  `${PREFIX_CUSTOMER}/update-company`,
  accessTokenValidator,
  verifiedUserValidator,
  updateCustomerCompanyValidator,
  filterMiddleware<UpdateCustomerCompanyReqBody>([
    'id',
    'tax_code',
    'name',
    'website',
    'surrogate',
    'address_company',
    'phone',
    'email',
    'contact_name',
    'attachments',
    'note',
    'status',
    'verify',
    'consultantor_ids',
    'cccd'
  ]),
  wrapRequestHandler(updateCustomerCompanyController)
)

/**
 * Description: Update customer with type Personal
 * Method: PATCH
 * Path: /update-personal
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: UpdateCustomerCompanyReqBody
 * */
customerRouter.patch(
  `${PREFIX_CUSTOMER}/update-personal`,
  accessTokenValidator,
  verifiedUserValidator,
  updateCustomerPersonalValidator,
  filterMiddleware<UpdateCustomerPersonalReqBody>([
    'id',
    'name',
    'date_of_birth',
    'email',
    'phone',
    'gender',
    'attachments',
    'note',
    'address_personal',
    'consultantor_ids',
    'status',
    'verify',
    'cccd'
  ]),
  wrapRequestHandler(updateCustomerPersonalController)
)

/**
 * Description: Upload multiple file attachment
 * Path: /upload-files
 * Method: POST
 * Request header: { Authorization: Bearer <access_token> }
 * Request form data: { attachments: string }
 * */
customerRouter.post(
  `${PREFIX_CUSTOMER}/upload-files`,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadFilesCustomerController)
)

/**
 * Description: Get list customer (search with name or phone with pagination)
 * Path: /
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request Query: ListCustomerReqQuery
 * */
customerRouter.get(
  `${PREFIX_CUSTOMER}`,
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(getListCustomerController)
)

/**
 * Description: get customer detail
 * Path: /detail/:id
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request params: {id: string}
 * Query String: { page?: string; limit?: string }
 *  * */
customerRouter.get(
  `${PREFIX_CUSTOMER}/detail/:id`,
  accessTokenValidator,
  verifiedUserValidator,
  getCustomerDetailValidator,
  paginationValidator,
  permissionGetDetailCustomerValidator,
  wrapRequestHandler(getCustomerDetailController)
)

export default customerRouter
