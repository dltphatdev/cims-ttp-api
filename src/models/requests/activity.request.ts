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

export interface UpdateActivityReqBody {
  id: number
  name?: string
  customer_id?: number
  contact_name?: string
  address?: string
  phone?: string
  status?: ActivityStatus
  time_start?: string
  time_end?: string
  content?: string
  assign_at?: string
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
