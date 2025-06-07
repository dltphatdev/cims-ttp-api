import express from 'express'
import cors from 'cors'
import { CONFIG_ENV } from '@/constants/config'
import { initFolder } from '@/utils/file'
import { defaultErrorHandle } from '@/middlewares/errors.middleware'
import { PrismaClient } from '../generated/prisma'
import userRouter from '@/routes/user.route'
import { PREFIX_API } from '@/constants/path'
import { hashPassword } from '@/utils/crypto'

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
app.use(PREFIX_API, userRouter)
app.use(defaultErrorHandle)

app.listen(port, () => {
  console.log(`Server API running on ${CONFIG_ENV.STATUS} with port = ${port}`)
})
