import MSG from '@/constants/msg'
import { CreateCustomerReqBody, UpdateCustomerCompanyReqBody } from '@/models/requests/customer.request'
import { TokenPayLoad } from '@/models/requests/user.request'
import customerService from '@/services/customer.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const createCustomerController = async (
  req: Request<ParamsDictionary, any, CreateCustomerReqBody>,
  res: Response
) => {
  const { name, type } = req.body
  const { user_id } = req.decode_authorization as TokenPayLoad
  const result = await customerService.createService({ name, type, user_id })
  res.json(result)
  return
}

export const updateCustomerCompanyController = async (
  req: Request<ParamsDictionary, any, UpdateCustomerCompanyReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await customerService.updateService(payload)
  res.json({
    message: MSG.UPDATED_CUSTOMER_SUCCESS,
    data: result
  })
  return
}
