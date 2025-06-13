import { Request, Response } from 'express'
import path from 'path'
import { ServeReqParams } from '@/models/requests/serve.request'
import { UPLOAD_FILE_DIR, UPLOAD_FILES_DIR, UPLOAD_IMAGE_DIR } from '@/constants/dir'
import MSG from '@/constants/msg'

export const serveImageController = (req: Request<ServeReqParams>, res: Response) => {
  const { name } = req.params
  res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send(MSG.NOT_FOUND)
    }
  })
  return
}

export const serveFileController = (req: Request<ServeReqParams>, res: Response) => {
  const { name } = req.params
  res.sendFile(path.resolve(UPLOAD_FILE_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send(MSG.NOT_FOUND)
    }
  })
  return
}

export const serveFilesController = (req: Request<ServeReqParams>, res: Response) => {
  const { name } = req.params
  res.sendFile(path.resolve(UPLOAD_FILES_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send(MSG.NOT_FOUND)
    }
  })
  return
}
