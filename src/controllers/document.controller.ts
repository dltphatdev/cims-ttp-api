import MSG from '@/constants/msg'
import {
  // CreateDocumentReqBody,
  GetDocumentDetailReqParams,
  GetListDocumentReqQuery
  // UpdateDocumentReqBody
} from '@/models/requests/document.request'
import { TokenPayLoad } from '@/models/requests/user.request'
import documentService from '@/services/document.service'
import mediaService from '@/services/media.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
// export const createDocumentController = async (
//   req: Request<ParamsDictionary, any, CreateDocumentReqBody>,
//   res: Response
// ) => {
//   const { user_id } = req.decode_authorization as TokenPayLoad
//   const payload = req.body
//   const result = await documentService.create({ ...payload, user_id })
//   res.json(result)
//   return
// }

export const uploadFileDocumentController = async (req: Request, res: Response) => {
  const result = await mediaService.handleUploadFile(req)
  res.json({
    message: MSG.UPLOAD_FILE_SUCCESSFULLY,
    data: result
  })
  return
}

// export const updateDocumentController = async (
//   req: Request<ParamsDictionary, any, UpdateDocumentReqBody>,
//   res: Response
// ) => {
//   const payload = req.body
//   const result = await documentService.update(payload)
//   res.json(result)
//   return
// }

export const getDocumentDetailController = async (req: Request<GetDocumentDetailReqParams>, res: Response) => {
  const { id } = req.params
  const result = await documentService.getDocumentDetail(Number(id))
  res.json({
    message: MSG.GET_DETAIL_DOCUMENT_SUCCESS,
    data: result
  })
  return
}

export const getListDocumentController = async (
  req: Request<ParamsDictionary, any, any, GetListDocumentReqQuery>,
  res: Response
) => {
  const { user_id, role } = req.decode_authorization as TokenPayLoad
  const payload = req.query
  const { documents, totalDocuments, limit, page } = await documentService.documentList({ payload, role, user_id })
  const totalPages = Math.ceil(totalDocuments / limit)
  res.json({
    message: MSG.GET_LIST_CUSTOMER_SUCCESS,
    data: {
      documents,
      page,
      limit,
      totalPages
    }
  })
  return
}

export const upsertDocumentController = async (req: Request, res: Response) => {
  const { user_id } = req.decode_authorization as TokenPayLoad
  const payload = req.body
  // const result = await documentService.upsert()
  // res.json(result)
  return
}
