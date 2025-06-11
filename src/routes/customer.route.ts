import { Router } from 'express'
import { PREFIX_CUSTOMER } from '@/constants/path'
import { wrapRequestHandler } from '@/utils/handler'
import { createCustomerController, updateCustomerCompanyController } from '@/controllers/customer.controller'
import { accessTokenValidator, verifiedUserValidator } from '@/middlewares/user.middleware'
import { createCustomerValidator, updateCustomerCompanyValidator } from '@/middlewares/customer.middleware'
import { filterMiddleware } from '@/middlewares/common.middleware'
import { UpdateCustomerCompanyReqBody } from '@/models/requests/customer.request'
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
    'note'
  ]),
  wrapRequestHandler(updateCustomerCompanyController)
)

export default customerRouter
