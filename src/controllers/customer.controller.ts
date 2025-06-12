import MSG from '@/constants/msg'
import {
  CreateCustomerReqBody,
  ListCustomerReqQuery,
  UpdateCustomerCompanyReqBody,
  UpdateCustomerPersonalReqBody
} from '@/models/requests/customer.request'
import { TokenPayLoad } from '@/models/requests/user.request'
import customerService from '@/services/customer.service'
import mediaService from '@/services/media.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const createCustomerController = async (
  req: Request<ParamsDictionary, any, CreateCustomerReqBody>,
  res: Response
) => {
  const payload = req.body
  const { user_id } = req.decode_authorization as TokenPayLoad
  const result = await customerService.createService({ payload, user_id })
  res.json(result)
  return
}

export const updateCustomerCompanyController = async (
  req: Request<ParamsDictionary, any, UpdateCustomerCompanyReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await customerService.updateCustomerCompany(payload)
  res.json({
    message: MSG.UPDATED_CUSTOMER_SUCCESS,
    data: result
  })
  return
}

export const updateCustomerPersonalController = async (
  req: Request<ParamsDictionary, any, UpdateCustomerPersonalReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await customerService.updateCustomerPersonal(payload)
  res.json({
    message: MSG.UPDATED_CUSTOMER_SUCCESS,
    data: result
  })
}

export const uploadFileCustomerController = async (req: Request, res: Response) => {
  const result = await mediaService.handleUploadFile(req)
  res.json({
    message: MSG.UPLOAD_FILE_SUCCESSFULLY,
    data: result
  })
  return
}

export const getListCustomerController = async (
  req: Request<ParamsDictionary, any, any, ListCustomerReqQuery>,
  res: Response
) => {
  const payload = req.query
  const { customers, totalCustomers, limit, page } = await customerService.serviceList(payload)
  const totalPages = Math.ceil(totalCustomers / limit)
  res.json({
    message: MSG.GET_LIST_CUSTOMER_SUCCESS,
    data: {
      customers,
      page,
      limit,
      totalPages
    }
  })
  return
}
