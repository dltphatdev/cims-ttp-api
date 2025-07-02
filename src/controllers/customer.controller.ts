import MSG from '@/constants/msg'
import {
  CreateCustomerReqBody,
  GetCustomerDetailReqParams,
  ListCustomerReqQuery,
  Pagination,
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
  const result = await customerService.createCustomer({ payload, user_id })
  res.json(result)
  return
}

export const updateCustomerCompanyController = async (
  req: Request<ParamsDictionary, any, UpdateCustomerCompanyReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await customerService.updateCustomerCompany(payload)
  res.json(result)
  return
}

export const updateCustomerPersonalController = async (
  req: Request<ParamsDictionary, any, UpdateCustomerPersonalReqBody>,
  res: Response
) => {
  const payload = req.body
  const result = await customerService.updateCustomerPersonal(payload)
  res.json(result)
}

export const uploadFilesCustomerController = async (req: Request, res: Response) => {
  const result = await mediaService.handleUploadFiles(req)
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

export const getCustomerDetailController = async (
  req: Request<GetCustomerDetailReqParams, any, any, Pagination>,
  res: Response
) => {
  const id = Number(req.params?.id)
  const reqQuery = req.query
  const { customer, limit, page, totalActivities } = await customerService.getCustomerDetail({
    id,
    page: reqQuery.page,
    limit: reqQuery.limit
  })
  const totalPagesActivities = Math.ceil(totalActivities / limit)
  res.json({
    message: MSG.GET_CUSTOMER_SUCCESS,
    data: {
      customer,
      limit_activities: limit,
      page_activities: page,
      totalPagesActivities
    }
  })
  return
}
