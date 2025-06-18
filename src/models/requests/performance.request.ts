import { PerformanceStatus } from '@prisma/client'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface Pagination extends Query {
  page?: string
  limit?: string
}

export interface ListPerformanceReqQuery extends Pagination {
  name?: string
}

export interface CreatePerformanceReqBody {
  name: string
  customer_id: number
  note?: string
  status: PerformanceStatus
  assign_at: string
}

export interface GetPerformanceReqParams extends ParamsDictionary {
  id: string
}

export interface UpdatePerformanceReqBody {
  id: number
  name?: string
  customer_id?: number
  assign_at?: string
  note?: string
  status?: PerformanceStatus
  operating_cost?: number
  customer_care_cost?: number
  commission_cost?: number
  diplomatic_cost?: number
  reserve_cost?: number
  customer_cost?: number
}
