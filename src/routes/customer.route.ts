import { Router } from 'express'
import { PREFIX_CUSTOMER } from '@/constants/path'
import { wrapRequestHandler } from '@/utils/handler'
import {
  createCustomerController,
  getListCustomerController,
  updateCustomerCompanyController,
  updateCustomerPersonalController,
  uploadFileCustomerController
} from '@/controllers/customer.controller'
import { accessTokenValidator, verifiedUserValidator } from '@/middlewares/user.middleware'
import {
  createCustomerValidator,
  paginationValidator,
  updateCustomerCompanyValidator,
  updateCustomerPersonalValidator
} from '@/middlewares/customer.middleware'
import { filterMiddleware } from '@/middlewares/common.middleware'
import { UpdateCustomerCompanyReqBody, UpdateCustomerPersonalReqBody } from '@/models/requests/customer.request'
const customerRouter = Router()

/**
 * Description: Create new customer
 * Method: POST
 * Path: /create
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: { name: string; type: CustomerType }
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
    'attachment',
    'note',
    'status',
    'verify',
    'consultantor_id',
    'assign_at'
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
    'attachment',
    'note',
    'address_personal',
    'status',
    'verify',
    'consultantor_id',
    'assign_at'
  ]),
  wrapRequestHandler(updateCustomerPersonalController)
)

/**
 * Description: Upload file attachment
 * Path: /upload-file
 * Method: POST
 * Request header: { Authorization: Bearer <access_token> }
 * Request form data: { file: string }
 * */
customerRouter.post(
  `${PREFIX_CUSTOMER}/upload-file`,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadFileCustomerController)
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

export default customerRouter
