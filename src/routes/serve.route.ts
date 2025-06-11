import { Router } from 'express'
import { serveFileController, serveImageController } from '@/controllers/serve.controller'

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

export default serveRouter
