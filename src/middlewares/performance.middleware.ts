import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { stringEnumToArray } from '@/utils/common'
import { validate } from '@/utils/validation'
import { PerformanceStatus } from '@prisma/client'
import { checkSchema, ParamSchema } from 'express-validator'

const performanceStatus = stringEnumToArray(PerformanceStatus)

const nameSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.NAME_PERFORMANCE_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 3,
      max: 160
    },
    errorMessage: MSG.NAME_PERFORMANCE_LENGTH
  }
}

const customerId: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.CUSTOMER_ID_IS_REQUIRED
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

const assignAtSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: MSG.ASSIGN_AT_ISO8601
  }
}

const idPerformanceSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ID_PERFORMANCE_IS_REQUIRED
  },
  custom: {
    options: async (value: string) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const performance = await prisma.performance.findUnique({
          where: {
            id: Number(value)
          }
        })
        if (performance === null) {
          throw new Error(MSG.PERFORMANCE_NOT_FOUND)
        }
        return true
      } catch (error) {
        throw error
      }
    }
  }
}

const statusSchema: ParamSchema = {
  isIn: {
    options: [performanceStatus],
    errorMessage: MSG.PERFORMANCE_STATUS_INVALID
  }
}

const operatingCostSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.OPERATING_COST_IS_REQUIRED
  },
  isFloat: {
    options: {
      min: 0,
      max: 100
    },
    errorMessage: MSG.OPERATING_COST_MUST_BE_NUMBER_FROM_0_TO_100
  }
}

const customerCareCostSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.CUSTOMER_CARE_COST_IS_REQUIRED
  },
  isFloat: {
    options: {
      min: 0,
      max: 100
    },
    errorMessage: MSG.CUSTOMER_CARE_COST_MUST_BE_NUMBER_FROM_0_TO_100
  }
}

const commissionCostSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.COMMISSION_COST_IS_REQUIRED
  },
  isFloat: {
    options: {
      min: 0,
      max: 100
    },
    errorMessage: MSG.COMMISSION_COST_MUST_BE_NUMBER_FROM_0_TO_100
  }
}

const diplomaticCostSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.DIPLOMATIC_COST_IS_REQUIRED
  },
  isFloat: {
    options: {
      min: 0,
      max: 100
    },
    errorMessage: MSG.DIPLOMATIC_COST_MUST_BE_NUMBER_FROM_0_TO_100
  }
}

const reserveCostSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.RESERVE_COST_IS_REQUIRED
  },
  isFloat: {
    options: {
      min: 0,
      max: 100
    },
    errorMessage: MSG.RESERVE_COST_MUST_BE_NUMBER_FROM_0_TO_100
  }
}

const customerCostSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.CUSTOMER_COST_IS_REQUIRED
  },
  isFloat: {
    options: {
      min: 0,
      max: 100
    },
    errorMessage: MSG.CUSTOMER_COST_MUST_BE_NUMBER_FROM_0_TO_100
  }
}

export const createPerformanceValidator = validate(
  checkSchema(
    {
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
      note: {
        ...noteSchema,
        optional: true
      },
      status: statusSchema,
      assign_at: assignAtSchema
    },
    ['body']
  )
)

export const getPerformanceValidator = validate(
  checkSchema(
    {
      id: idPerformanceSchema
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

export const updatePerformanceValidator = validate(
  checkSchema(
    {
      id: idPerformanceSchema,
      name: {
        ...nameSchema,
        optional: true
      },
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
        },
        optional: true
      },
      assign_at: {
        ...assignAtSchema,
        optional: true
      },
      note: {
        ...noteSchema,
        optional: true
      },
      status: {
        ...statusSchema,
        optional: true
      },
      operating_cost: {
        ...operatingCostSchema,
        optional: true
      },
      customer_care_cost: {
        ...customerCareCostSchema,
        optional: true
      },
      commission_cost: {
        ...commissionCostSchema,
        optional: true
      },
      diplomatic_cost: {
        ...diplomaticCostSchema,
        optional: true
      },
      reserve_cost: {
        ...reserveCostSchema,
        optional: true
      },
      customer_cost: {
        ...customerCostSchema,
        optional: true
      }
    },
    ['body']
  )
)
