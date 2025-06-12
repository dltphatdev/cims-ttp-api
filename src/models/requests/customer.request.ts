import { CustomerGender, CustomerStatus, CustomerType, CustomerVerify } from '@prisma/client'
import { Query } from 'express-serve-static-core'

export interface CreateCustomerReqBody {
  name: string
  type: CustomerType
}

export interface UpdateCustomerCompanyReqBody {
  id: number
  tax_code: string
  consultantor_id?: number
  name?: string
  website?: string
  surrogate?: string
  address_company?: string
  phone?: string
  email?: string
  contact_name?: string
  attachment?: string
  note?: string
  verify?: CustomerVerify
  status?: CustomerStatus
  assign_at?: string
}

export interface UpdateCustomerPersonalReqBody {
  id: number
  consultantor_id?: number
  name?: string
  date_of_birth?: string
  email?: string
  phone?: string
  gender?: CustomerGender
  attachment?: string
  note?: string
  address_personal?: string
  verify?: CustomerVerify
  status?: CustomerStatus
  assign_at?: string
}

export interface Pagination extends Query {
  page?: string
  limit?: string
}

export interface ListCustomerReqQuery extends Pagination {
  name?: string
  phone?: string
}
