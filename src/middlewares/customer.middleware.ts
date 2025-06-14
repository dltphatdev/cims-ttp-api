import { checkSchema, ParamSchema } from 'express-validator'
import HTTP_STATUS_CODE from '@/constants/httpStatusCode'
import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { ErrorsWithStatus } from '@/models/Errors'
import { stringEnumToArray } from '@/utils/common'
import { validate } from '@/utils/validation'
import { CustomerGender, CustomerStatus, CustomerType, CustomerVerify } from '@prisma/client'

const customerType = stringEnumToArray(CustomerType)
const customerGender = stringEnumToArray(CustomerGender)
const customerStatus = stringEnumToArray(CustomerStatus)
const customerVerify = stringEnumToArray(CustomerVerify)

const idParamsSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ID_IS_REQUIRED
  },
  custom: {
    options: async (value: string) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const customer = await prisma.customer.findUnique({
          where: {
            id: Number(value)
          }
        })
        if (customer === null) {
          throw new ErrorsWithStatus({
            message: MSG.CUSTOMER_NOT_FOUND,
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

const nameSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.NAME_CUSTOMER_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 3,
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

const cccdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.CCCD_IS_REQUIRED
  },
  trim: true,
  isLength: {
    options: {
      min: 12,
      max: 12
    },
    errorMessage: MSG.CCCD_LENGTH
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
      min: 4,
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

const dateOfBirthSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: MSG.DATE_OF_BIRTH_ISO8601
  }
}

const assignAtSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: MSG.ASSIGN_AT_ISO8601
  }
}

const attachmentsSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ATTACHMENTS_IS_REQUIRED
  },
  isArray: {
    errorMessage: MSG.ATTACHMENTS_MUST_BE_ARRAY
  },
  custom: {
    options: (value: string[]) => {
      if (value.length > 0 && !value.every((item) => typeof item === 'string')) {
        throw new Error(MSG.ATTACHMENT_ITEM_MUST_BE_ARRAY_STRING)
      }
      return true
    }
  }
}

export const createCustomerValidator = validate(
  checkSchema(
    {
      name: {
        ...nameSchema,
        custom: {
          options: async (value: string) => {
            const customer = await prisma.customer.findUnique({
              where: {
                name: value
              }
            })
            if (customer) {
              throw new Error(MSG.NAME_CUSTOMER_ALREADY_EXISTS)
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
      },
      consultantor_id: {
        ...idSchema,
        optional: true
      },
      tax_code: {
        ...taxCodeSchema,
        optional: true
      },
      cccd: {
        ...taxCodeSchema,
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
            const customers = await prisma.customer.findMany({
              where: {
                email: {
                  not: value
                }
              }
            })
            const isEmailCustomer = customers.some((item) => item.email === value)
            if (isEmailCustomer) {
              throw new Error(MSG.EMAIL_ALREADY_EXISTS)
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
      status: {
        isIn: {
          options: [customerStatus],
          errorMessage: MSG.CUSTOMER_STATUS_INVALID
        },
        optional: true
      },
      verify: {
        isIn: {
          options: [customerVerify],
          errorMessage: MSG.CUSTOMER_VERIFY_INVALID
        },
        optional: true
      },
      attachment: {
        ...attachmentSchema,
        optional: true
      },
      note: {
        ...noteSchema,
        optional: true
      },
      assign_at: {
        ...assignAtSchema,
        optional: true
      },
      date_of_birth: {
        ...dateOfBirthSchema,
        optional: true
      },
      gender: {
        isIn: {
          options: [customerGender],
          errorMessage: MSG.CUSTOMER_GENDER_INVALID
        },
        optional: true
      },
      address_personal: {
        ...addressSchema,
        optional: true
      },
      attachments: {
        ...attachmentsSchema,
        optional: true
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
          options: async (value: number) => {
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
      consultantor_id: {
        ...idSchema,
        custom: {
          options: async (value: number) => {
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
              return true
            } catch (error) {
              throw error
            }
          }
        },
        optional: true
      },
      tax_code: taxCodeSchema,
      name: {
        ...nameSchema,
        custom: {
          options: async (value: string) => {
            const customers = await prisma.customer.findMany({
              where: {
                name: {
                  not: value
                }
              }
            })
            const isNameCustomer = customers.some((item) => item.name === value)
            if (isNameCustomer) {
              throw new Error(MSG.NAME_CUSTOMER_ALREADY_EXISTS)
            }
            return true
          }
        },
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
            const customers = await prisma.customer.findMany({
              where: {
                email: {
                  not: value
                }
              }
            })
            const isEmailCustomer = customers.some((item) => item.email === value)
            if (isEmailCustomer) {
              throw new Error(MSG.EMAIL_ALREADY_EXISTS)
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
      status: {
        isIn: {
          options: [customerStatus],
          errorMessage: MSG.CUSTOMER_STATUS_INVALID
        },
        optional: true
      },
      verify: {
        isIn: {
          options: [customerVerify],
          errorMessage: MSG.CUSTOMER_VERIFY_INVALID
        },
        optional: true
      },
      attachment: {
        ...attachmentSchema,
        optional: true
      },
      note: {
        ...noteSchema,
        optional: true
      },
      assign_at: {
        ...assignAtSchema,
        optional: true
      }
    },
    ['body']
  )
)

export const updateCustomerPersonalValidator = validate(
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
              if (customer.type !== CustomerType.Personal) {
                throw new ErrorsWithStatus({
                  message: MSG.IS_CUSTOMER_PERSONAL,
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
      consultantor_id: {
        ...idSchema,
        custom: {
          options: async (value: number) => {
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
              return true
            } catch (error) {
              throw error
            }
          }
        },
        optional: true
      },
      name: {
        ...nameSchema,
        custom: {
          options: async (value: string) => {
            const customers = await prisma.customer.findMany({
              where: {
                name: {
                  not: value
                }
              }
            })
            const isNameCustomer = customers.some((item) => item.name === value)
            if (isNameCustomer) {
              throw new Error(MSG.NAME_CUSTOMER_ALREADY_EXISTS)
            }
            return true
          }
        },
        optional: true
      },
      date_of_birth: {
        ...dateOfBirthSchema,
        optional: true
      },
      assign_at: {
        ...assignAtSchema,
        optional: true
      },
      email: {
        ...emailSchema,
        custom: {
          options: async (value: string) => {
            const customers = await prisma.customer.findMany({
              where: {
                email: {
                  not: value
                }
              }
            })
            const isEmailCustomer = customers.some((item) => item.email === value)
            if (isEmailCustomer) {
              throw new Error(MSG.EMAIL_ALREADY_EXISTS)
            }
            return true
          }
        },
        optional: true
      },
      cccd: {
        ...taxCodeSchema,
        optional: true
      },
      phone: {
        ...phoneSchema,
        optional: true
      },
      gender: {
        isIn: {
          options: [customerGender],
          errorMessage: MSG.CUSTOMER_GENDER_INVALID
        },
        optional: true
      },
      status: {
        isIn: {
          options: [customerStatus],
          errorMessage: MSG.CUSTOMER_STATUS_INVALID
        },
        optional: true
      },
      verify: {
        isIn: {
          options: [customerVerify],
          errorMessage: MSG.CUSTOMER_VERIFY_INVALID
        },
        optional: true
      },
      address_personal: {
        ...addressSchema,
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

export const getCustomerDetailValidator = validate(
  checkSchema(
    {
      id: idParamsSchema
    },
    ['params']
  )
)
