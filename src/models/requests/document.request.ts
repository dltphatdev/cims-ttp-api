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

export interface UpsertDocumentReqBody {
  name: string
  description?: string
  attachments?: string[]
}
