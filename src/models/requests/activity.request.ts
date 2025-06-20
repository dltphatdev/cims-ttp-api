import { ActivityStatus } from '@prisma/client'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface CreateActivityReqBody {
  name: string
  customer_id: number
  contact_name: string
  address: string
  phone: string
  status: ActivityStatus
  time_start: string
  time_end: string
  content?: string
  assign_at?: string
}

export interface UpdateActivityReqBody
  extends Pick<
    CreateActivityReqBody,
    | 'name'
    | 'customer_id'
    | 'contact_name'
    | 'address'
    | 'phone'
    | 'status'
    | 'time_start'
    | 'time_end'
    | 'content'
    | 'assign_at'
  > {
  id: number
}

export interface GetDetailActivityReqParams extends ParamsDictionary {
  id: string
}

export interface Pagination extends Query {
  page?: string
  limit?: string
}

export interface GetListActivityReqQuery extends Pagination {
  name?: string
}
