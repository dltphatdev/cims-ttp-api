import { CustomerGender, CustomerStatus, CustomerType, CustomerVerify } from '@prisma/client'
import { Query, ParamsDictionary } from 'express-serve-static-core'

export interface GetCustomerDetailReqParams extends ParamsDictionary {
  id: string
}
export interface CreateCustomerReqBody {
  name: string
  type: CustomerType
  tax_code?: string
  cccd?: string
  website?: string
  surrogate?: string
  address_company?: string
  address_personal?: string
  phone?: string
  email?: string
  contact_name?: string
  status?: CustomerStatus
  verify?: CustomerVerify
  note?: string
  assign_at?: string
  date_of_birth?: string
  gender?: CustomerGender
  attachments?: string[]
  consultantor_ids?: number[]
}

export interface UpdateCustomerCompanyReqBody {
  id: number
  tax_code?: string
  cccd?: string
  name?: string
  website?: string
  surrogate?: string
  address_company?: string
  phone?: string
  email?: string
  contact_name?: string
  attachments?: string[]
  note?: string
  verify?: CustomerVerify
  status?: CustomerStatus
  consultantor_ids?: number[]
}

export interface UpdateCustomerPersonalReqBody {
  id: number
  name?: string
  cccd?: string
  date_of_birth?: string
  email?: string
  phone?: string
  gender?: CustomerGender
  note?: string
  address_personal?: string
  verify?: CustomerVerify
  status?: CustomerStatus
  attachments?: string[]
  consultantor_ids?: number[]
}

export interface Pagination extends Query {
  page?: string
  limit?: string
}

export interface ListCustomerReqQuery extends Pagination {
  name?: string
  phone?: string
}
