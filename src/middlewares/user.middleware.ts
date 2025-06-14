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
import userService from '@/services/user.service'
import { stringEnumToArray } from '@/utils/common'
import { UserRole, UserVerifyStatus } from '@prisma/client'

const userRole = stringEnumToArray(UserRole)
const userVerifyStatus = stringEnumToArray(UserVerifyStatus)

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

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ID_IS_REQUIRED
  },
  custom: {
    options: async (value: number, { req }) => {
      if (typeof value !== 'number') {
        throw new Error(MSG.ID_MUST_BE_NUMBER)
      }
      // eslint-disable-next-line no-useless-catch
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: value
          }
        })
        if (user === null) {
          throw new ErrorsWithStatus({
            message: MSG.USER_NOT_FOUND,
            status: HTTP_STATUS_CODE.NOT_FOUND
          })
        }
        return true
      } catch (error) {
        throw error
      }
    }
  }
}

const idParamsSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ID_IS_REQUIRED
  },
  custom: {
    options: async (value: string) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(value)
          }
        })
        if (user === null) {
          throw new ErrorsWithStatus({
            message: MSG.USER_NOT_FOUND,
            status: HTTP_STATUS_CODE.NOT_FOUND
          })
        }
        return true
      } catch (error) {
        throw error
      }
    }
  }
}

const fullnameSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.FULLNAME_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 3,
      max: 160
    },
    errorMessage: MSG.FULLNAME_LENGTH
  }
}

const dateOfBirthSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: MSG.DATE_OF_BIRTH_ISO8601
  }
}

const avatarSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.AVATAR_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 255
    },
    errorMessage: MSG.AVATAR_LENGTH
  }
}

const addressSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.ADDRESS_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 160
    },
    errorMessage: MSG.ADDRESS_LENGTH
  }
}

const phoneSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.PHONE_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 10,
      max: 10
    },
    errorMessage: MSG.PHONE_LENGTH
  }
}

const codeSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.CODE_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 6
    },
    errorMessage: MSG.CODE_LENGTH
  }
}

export const loginValidator = validate(
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

export const userRoleValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decode_authorization as TokenPayLoad
  const user = await prisma.user.findUnique({
    where: {
      id: user_id
    }
  })
  if (user?.role !== UserRole.SuperAdmin) {
    return next(
      new ErrorsWithStatus({
        message: MSG.NO_PERMISSION_CREATE_USER,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

export const createUserValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {
          options: async (value: string) => {
            const user = await userService.isExistUser(value)
            if (user) {
              throw new Error(MSG.EMAIL_ALREADY_EXISTS)
            }
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const updateUserValidator = validate(
  checkSchema(
    {
      id: idSchema,
      fullname: {
        ...fullnameSchema,
        optional: true
      },
      address: {
        ...addressSchema,
        optional: true
      },
      avatar: {
        ...avatarSchema,
        optional: true
      },
      code: {
        ...codeSchema,
        optional: true
      },
      date_of_birth: {
        ...dateOfBirthSchema,
        optional: true
      },
      role: {
        isIn: {
          options: [userRole],
          errorMessage: MSG.ROLE_INVALID
        },
        optional: true
      },
      verify: {
        isIn: {
          options: [userVerifyStatus],
          errorMessage: MSG.USER_VERIFY_STATUS_INVALID
        },
        optional: true
      },
      phone: {
        ...phoneSchema,
        optional: true
      },
      password: {
        ...passwordSchema,
        optional: true
      }
    },
    ['body']
  )
)

export const updateProfileValidator = validate(
  checkSchema(
    {
      fullname: {
        ...fullnameSchema,
        optional: true
      },
      avatar: {
        ...avatarSchema,
        optional: true
      },
      address: {
        ...addressSchema,
        optional: true
      },
      phone: {
        ...phoneSchema,
        optional: true
      },
      code: {
        ...codeSchema,
        optional: true
      },
      date_of_birth: {
        ...dateOfBirthSchema,
        optional: true
      }
    },
    ['body']
  )
)

export const changePasswordValidator = validate(
  checkSchema(
    {
      old_password: {
        ...passwordSchema,
        custom: {
          options: async (value: string, { req }) => {
            const { user_id } = (req as Request).decode_authorization as TokenPayLoad
            const user = await prisma.user.findUnique({
              where: {
                id: user_id
              }
            })
            if (!user) {
              throw new Error(MSG.USER_NOT_FOUND)
            }
            if (user.password !== hashPassword(value)) {
              throw new Error(MSG.OLD_PASSWORD_INCORRECT)
            }
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const getUserDetailValidator = validate(
  checkSchema(
    {
      id: idParamsSchema
    },
    ['params']
  )
)

export const paginationValidator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: (value) => {
            const number = Number(value)
            if (number < 1 || number > 100) {
              throw new Error(MSG.LIMIT_LENGHT)
            }
            return true
          }
        },
        optional: true
      },
      page: {
        isNumeric: true,
        custom: {
          options: (value) => {
            const number = Number(value)
            if (number < 1) {
              throw new Error(MSG.PAGE_INVALID)
            }
            return true
          }
        },
        optional: true
      }
    },
    ['query']
  )
)
