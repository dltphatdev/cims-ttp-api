import { PREFIX_DOCUMENT } from '@/constants/path'
import {
  createDocumentController,
  getDocumentDetailController,
  getListDocumentController,
  updateDocumentController,
  uploadFileDocumentController
} from '@/controllers/document.controller'
import {
  createDocumentValidator,
  getDocumentDetailValidator,
  paginationValidator,
  updateDocumentValidator
} from '@/middlewares/document.middleware'
import {
  permissionCreateDocumentValidator,
  permissionDocumentDetailValidator
} from '@/middlewares/permission.middleware'
import { accessTokenValidator, verifiedUserValidator } from '@/middlewares/user.middleware'
import { wrapRequestHandler } from '@/utils/handler'
import { Router } from 'express'

const documentRouter = Router()

/**
 * Description: Create document
 * Path: /create
 * Method: POST
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: CreateDocumentReqBody
 * */
documentRouter.post(
  `${PREFIX_DOCUMENT}/create`,
  accessTokenValidator,
  verifiedUserValidator,
  createDocumentValidator,
  permissionCreateDocumentValidator,
  wrapRequestHandler(createDocumentController)
)

/**
 * Description: Update document
 * Path: /create
 * Method: PATCH
 * Request header: { Authorization: Bearer <access_token> }
 * Request body: UpdateDocumentReqBody
 * */
documentRouter.patch(
  `${PREFIX_DOCUMENT}/update`,
  accessTokenValidator,
  verifiedUserValidator,
  updateDocumentValidator,
  wrapRequestHandler(updateDocumentController)
)

/**
 * Description: get document detail
 * Path: /detail/:id
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request params: {id: string}
 *  * */
documentRouter.get(
  `${PREFIX_DOCUMENT}/detail/:id`,
  accessTokenValidator,
  verifiedUserValidator,
  getDocumentDetailValidator,
  permissionDocumentDetailValidator,
  wrapRequestHandler(getDocumentDetailController)
)

/**
 * Description: Upload file attachment
 * Path: /upload-file
 * Method: POST
 * Request header: { Authorization: Bearer <access_token> }
 * Request form data: { attachment: string }
 * */
documentRouter.post(
  `${PREFIX_DOCUMENT}/upload-file`,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadFileDocumentController)
)

/**
 * Description: Get list document (search with namewith pagination)
 * Path: /
 * Method: GET
 * Request header: { Authorization: Bearer <access_token> }
 * Request Query: GetListDocumentReqQuery
 * */
documentRouter.get(
  `${PREFIX_DOCUMENT}`,
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(getListDocumentController)
)

export default documentRouter
