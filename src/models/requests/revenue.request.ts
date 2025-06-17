import { RevenueDirection, TypeRevenue } from '@prisma/client'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface CreateRevenueReqBody {
  name: string
  description: string
  unit_caculate: string
  type: TypeRevenue
  performance_id: number
  price: number
  quantity: number
  direction: RevenueDirection
}

export interface UpdateRevenueReqBody {
  id: number
  name?: string
  description?: string
  unit_caculate?: string
  type?: TypeRevenue
  price?: number
  quantity?: number
}

export interface GetRevenueReqParams extends ParamsDictionary {
  id: string
}

export interface GetRevenueReqQuery extends Query {
  direction: RevenueDirection
}

export interface RevenueReqQuery extends Query {
  input_page?: string
  output_page?: string
  input_limit?: string
  output_limit?: string
}
