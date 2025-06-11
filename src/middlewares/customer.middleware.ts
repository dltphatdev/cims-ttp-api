import HTTP_STATUS_CODE from '@/constants/httpStatusCode'
import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { ErrorsWithStatus } from '@/models/Errors'
import { stringEnumToArray } from '@/utils/common'
import { validate } from '@/utils/validation'
import { CustomerType } from '@prisma/client'
import { checkSchema, ParamSchema } from 'express-validator'

const customerType = stringEnumToArray(CustomerType)

const nameSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.NAME_CUSTOMER_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 160
    },
    errorMessage: MSG.NAME_CUSTOMER_LENGTH
  }
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ID_IS_REQUIRED
  }
}

const taxCodeSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.TAX_CODE_IS_REQUIRED
  },
  trim: true,
  isLength: {
    options: {
      min: 10,
      max: 13
    },
    errorMessage: MSG.TAX_CODE_LENGTH
  }
}

const websiteSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.WEBSITE_MUST_BE_STRING
  },
  trim: true,
  optional: true,
  isLength: {
    options: {
      min: 1,
      max: 50
    },
    errorMessage: MSG.WEBSITE_LENGTH
  }
}

const surrogateSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.SURROGATE_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 160
    },
    errorMessage: MSG.SURROGATE_MUST_LENGTH
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

const attachmentSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.ATTACHMENT_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 255
    },
    errorMessage: MSG.ATTACHMENT_LENGTH
  }
}

const noteSchema: ParamSchema = {
  trim: true,
  isLength: {
    options: {
      max: 2000
    },
    errorMessage: MSG.NOTE_MAX_LENGTH
  }
}

export const createCustomerValidator = validate(
  checkSchema(
    {
      name: {
        ...nameSchema,
        custom: {
          options: async (value: string) => {
            const customer = await prisma.customer.findFirst({
              where: {
                name: value
              }
            })
            if (customer) {
              throw new ErrorsWithStatus({
                message: MSG.NAME_CUSTOMER_ALREADY_EXISTS,
                status: HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY
              })
            }
            return true
          }
        }
      },
      type: {
        isIn: {
          options: [customerType],
          errorMessage: MSG.CUSTOMER_TYPE_INVALID
        }
      }
    },
    ['body']
  )
)

export const updateCustomerCompanyValidator = validate(
  checkSchema(
    {
      id: {
        ...idSchema,
        custom: {
          options: async (value: number, { req }) => {
            if (typeof value !== 'number') {
              throw new Error(MSG.ID_MUST_BE_NUMBER)
            }
            // eslint-disable-next-line no-useless-catch
            try {
              const customer = await prisma.customer.findUnique({
                where: {
                  id: value
                }
              })
              if (customer === null) {
                throw new ErrorsWithStatus({
                  message: MSG.CUSTOMER_NOT_FOUND,
                  status: HTTP_STATUS_CODE.NOT_FOUND
                })
              }
              if (customer.type !== CustomerType.Company) {
                throw new ErrorsWithStatus({
                  message: MSG.IS_CUSTOMER_COMPANY,
                  status: HTTP_STATUS_CODE.FORBIDDEN
                })
              }
              return true
            } catch (error) {
              throw error
            }
          }
        }
      },
      tax_code: taxCodeSchema,
      name: {
        ...nameSchema,
        optional: true
      },
      website: {
        ...websiteSchema,
        optional: true
      },
      surrogate: {
        ...surrogateSchema,
        optional: true
      },
      address_company: {
        ...addressSchema,
        optional: true
      },
      phone: {
        ...phoneSchema,
        optional: true
      },
      email: {
        ...emailSchema,
        custom: {
          options: async (value: string) => {
            const customer = await prisma.customer.findUnique({
              where: {
                email: value
              }
            })
            if (customer) {
              throw new ErrorsWithStatus({
                message: MSG.EMAIL_ALREADY_EXISTS,
                status: HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY
              })
            }
            return true
          }
        },
        optional: true
      },
      contact_name: {
        ...phoneSchema,
        optional: true
      },
      attachment: {
        ...attachmentSchema,
        optional: true
      },
      note: {
        ...noteSchema,
        optional: true
      }
    },
    ['body']
  )
)
