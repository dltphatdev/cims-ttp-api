import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface GetDocumentDetailReqParams extends ParamsDictionary {
  id: string
}

export interface Pagination extends Query {
  page?: string
  limit?: string
}

export interface GetListDocumentReqQuery extends Pagination {
  name?: string
}

export interface CreateDocumentReqBody {
  name: string
  description: string
  attachment: string
}

export interface UpdateDocumentReqBody {
  id: number
  name: string
  description?: string
}
