import { Router } from 'express'
import { serveFileController, serveFilesController, serveImageController } from '@/controllers/serve.controller'

const serveRouter = Router()

/**
 * Description: Serve single image route
 * Path: /image/:name
 * Method: GET
 * Request param: { name: string }
 * */
serveRouter.get('/image/:name', serveImageController)

/**
 * Description: Serve single file route
 * Path: /file/:name
 * Method: GET
 * Request param: { name: string }
 * */
serveRouter.get('/file/:name', serveFileController)

/**
 * Description: Serve multiple file route
 * Path: /files/:name
 * Method: GET
 * Request param: { name: string }
 * */
serveRouter.get('/files/:name', serveFilesController)

export default serveRouter
