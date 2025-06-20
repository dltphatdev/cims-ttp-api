import express from 'express'
import cors from 'cors'
import { CONFIG_ENV } from '@/constants/config'
import { initFolder } from '@/utils/file'
import { defaultErrorHandle } from '@/middlewares/errors.middleware'
import { PrismaClient } from '@prisma/client'
import userRouter from '@/routes/user.route'
import { PREFIX_API } from '@/constants/path'
import serveRouter from '@/routes/serve.route'
import customerRouter from '@/routes/customer.route'
import performanceRouter from '@/routes/performance.route'
import revenueRouter from '@/routes/revenue.route'
import activityRouter from '@/routes/activity.route'

initFolder()

export const prisma = new PrismaClient()

const port = CONFIG_ENV.PORT || 8080
const app = express()
app.use(
  cors({
    origin: '*',
    credentials: true
  })
)
app.use(express.json())
app.use('', serveRouter)
app.use(PREFIX_API, userRouter)
app.use(PREFIX_API, customerRouter)
app.use(PREFIX_API, revenueRouter)
app.use(PREFIX_API, performanceRouter)
app.use(PREFIX_API, activityRouter)
app.use(defaultErrorHandle)
app.listen(port, () => {
  console.log(`Server API running on ${CONFIG_ENV.STATUS} with port ${port}`)
})
