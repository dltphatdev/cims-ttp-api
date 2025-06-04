import { Request, Response, NextFunction } from 'express'
import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { hashPassword } from '@/utils/crypto'
import { validate } from '@/utils/validation'
import { checkSchema, ParamSchema } from 'express-validator'
import { ErrorsWithStatus } from '@/models/Errors'
import HTTP_STATUS_CODE from '@/constants/httpStatusCode'
import { CONFIG_ENV } from '@/constants/config'
import { verifyToken } from '@/utils/jwt'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { TokenPayLoad } from '@/models/requests/user.request'
import { UserVerifyStatus } from 'generated/prisma'

const emailSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.EMAIL_IS_REQUIRED
  },
  isString: {
    errorMessage: MSG.EMAIL_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 5,
      max: 160
    },
    errorMessage: MSG.EMAIL_LENGTH
  },
  isEmail: {
    errorMessage: MSG.EMAIL_INVALID
  }
}

const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.PASSWORD_IS_REQUIRED
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 160
    },
    errorMessage: MSG.PASSWORD_LENGTH
  }
}

export const userLoginValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {
          options: async (value: string, { req }) => {
            const user = await prisma.user.findUnique({
              where: {
                email: value,
                password: hashPassword(req.body.password)
              }
            })
            if (user === null) {
              throw new Error(MSG.EMAIL_OR_PASSWORD_INCORRECT)
            }
            ;(req as Request).user = user
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            try {
              if (!access_token) {
                throw new ErrorsWithStatus({
                  message: MSG.ACCESS_TOKEN_IS_REQUIRED,
                  status: HTTP_STATUS_CODE.UNAUTHORIZED
                })
              }
              const decode_authorization = await verifyToken({
                token: access_token,
                secretOrPublicKey: CONFIG_ENV.JWT_ACCESS_TOKEN_SECRET_KEY
              })
              ;(req as Request).decode_authorization = decode_authorization
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorsWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS_CODE.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorsWithStatus({
                message: MSG.REFRESH_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS_CODE.UNAUTHORIZED
              })
            }
            try {
              const [decode_refresh_token, refresh_token] = await Promise.all([
                verifyToken({
                  token: value,
                  secretOrPublicKey: CONFIG_ENV.JWT_REFRESH_TOKEN_SECRET_KEY
                }),
                prisma.refreshToken.findUnique({
                  where: {
                    token: value
                  },
                  select: {
                    token: true
                  }
                })
              ])

              if (refresh_token === null) {
                throw new ErrorsWithStatus({
                  message: MSG.TOKEN_NOT_FOUND,
                  status: HTTP_STATUS_CODE.NOT_FOUND
                })
              }
              ;(req as Request).decode_refresh_token = decode_refresh_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorsWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS_CODE.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const verifiedUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const { verify } = req.decode_authorization as TokenPayLoad
  if (verify !== UserVerifyStatus.Verified) {
    return next(
      new ErrorsWithStatus({
        message: MSG.VERIFY_USER_INVALID,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

// export const userRoleValidator = async (req: Request, res: Response, next: NextFunction) => {
//   const { user_id } = req.decode_authorization as TokenPayLoad
//   const
//   next()
// }
