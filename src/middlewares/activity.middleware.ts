import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { stringEnumToArray } from '@/utils/common'
import { validate } from '@/utils/validation'
import { ActivityStatus } from '@prisma/client'
import { checkSchema, ParamSchema } from 'express-validator'

const activityStatus = stringEnumToArray(ActivityStatus)

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ID_IS_REQUIRED
  },
  custom: {
    options: async (value: string) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const activity = await prisma.activity.findUnique({
          where: {
            id: Number(value)
          }
        })
        if (activity === null) {
          throw new Error(MSG.ACTIVITY_NOT_FOUND)
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
    errorMessage: MSG.NAME_ACTIVITY_MUST_BE_STRING
  },
  trim: true,
  notEmpty: {
    errorMessage: MSG.NAME_ACTIVITY_IS_REQUIRED
  },
  isLength: {
    options: {
      min: 2,
      max: 160
    },
    errorMessage: MSG.NAME_ACTIVITY_LENGTH
  }
}

const customerId: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.CUSTOMER_ID_IS_REQUIRED
  }
}

const contactNameSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.CONTACT_NAME_ACTIVITY_MUST_BE_STRING
  },
  trim: true,
  notEmpty: {
    errorMessage: MSG.CONTACT_NAME_ACTIVITY_IS_REQUIRED
  },
  isLength: {
    options: {
      min: 2,
      max: 160
    },
    errorMessage: MSG.CONTACT_NAME_ACTIVITY_LENGTH
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

const contentSchema: ParamSchema = {
  trim: true,
  isLength: {
    options: {
      max: 2000
    },
    errorMessage: MSG.CONTENT_MAX_LENGTH
  }
}

const timeStartSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: MSG.TIME_START_ISO8601
  }
}

const timeEndSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: MSG.TIME_END_ISO8601
  }
}

const statusSchema: ParamSchema = {
  isIn: {
    options: [activityStatus],
    errorMessage: MSG.ACTIVITY_STATUS_INVALID
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

export const createActivityValidator = validate(
  checkSchema({
    name: nameSchema,
    customer_id: {
      ...customerId,
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
            if (!customer) {
              throw new Error(MSG.CUSTOMER_NOT_FOUND)
            }
          } catch (error) {
            throw error
          }
        }
      }
    },
    contact_name: contactNameSchema,
    address: addressSchema,
    phone: phoneSchema,
    content: {
      ...contentSchema,
      optional: true
    },
    status: statusSchema,
    time_start: timeStartSchema,
    time_end: timeEndSchema,
    assign_at: {
      ...assignAtSchema,
      optional: true
    }
  })
)

export const updateActivityValidator = validate(
  checkSchema(
    {
      id: idSchema,
      name: nameSchema,
      customer_id: {
        ...customerId,
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
              if (!customer) {
                throw new Error(MSG.CUSTOMER_NOT_FOUND)
              }
            } catch (error) {
              throw error
            }
          }
        }
      },
      contact_name: contactNameSchema,
      address: addressSchema,
      phone: phoneSchema,
      content: {
        ...contentSchema,
        optional: true
      },
      status: statusSchema,
      time_start: timeStartSchema,
      time_end: timeEndSchema,
      assign_at: {
        ...assignAtSchema,
        optional: true
      }
    },
    ['body']
  )
)

export const getDetailActivityValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
