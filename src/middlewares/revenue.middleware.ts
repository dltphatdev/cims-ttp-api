import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { stringEnumToArray } from '@/utils/common'
import { validate } from '@/utils/validation'
import { RevenueDirection, TypeRevenue } from '@prisma/client'
import { checkSchema, ParamSchema } from 'express-validator'

const typeRevenue = stringEnumToArray(TypeRevenue)
const revenueDirection = stringEnumToArray(RevenueDirection)

const revenueDirectionSchema: ParamSchema = {
  isIn: {
    options: [revenueDirection],
    errorMessage: MSG.DIRECTION_REVENUE_INVALID
  }
}

const typeRevenueSchema: ParamSchema = {
  isIn: {
    options: [typeRevenue],
    errorMessage: MSG.TYPE_REVENUE_INVALID
  }
}

const nameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.NAME_REVENUE_IS_REQUIRED
  },
  isString: {
    errorMessage: MSG.NAME_REVENUE_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 3,
      max: 160
    },
    errorMessage: MSG.NAME_REVENUE_LENGTH
  }
}

const descriptionSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.DESCRIPTION_REVENUE_IS_REQUIRED
  },
  isString: {
    errorMessage: MSG.DESCRIPTION_REVENUE_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      max: 2000
    },
    errorMessage: MSG.DESCRIPTION_REVENUE_MAX_LENGTH
  }
}

const unitCaculateSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.UNIT_CACULATE_REVENUE_IS_REQUIRED
  },
  isString: {
    errorMessage: MSG.UNIT_CACULATE_REVENUE_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      max: 255
    },
    errorMessage: MSG.UNIT_CACULATE_REVENUE_MAX_LENGTH
  }
}

const priceSchema: ParamSchema = {
  isInt: {
    errorMessage: MSG.PRICE_REVENUE_MUST_BE_INT
  },
  toInt: true,
  custom: {
    options: (value: number) => {
      if (Number(value) < 1) {
        throw new Error(MSG.PRICE_REVENUE_GREATER_THAN_1)
      }
      return true
    }
  }
}

const quantitySchema: ParamSchema = {
  isInt: {
    errorMessage: MSG.QUANTITY_MUST_BE_INT
  },
  toInt: true,
  custom: {
    options: (value: number) => {
      if (Number(value) < 1) {
        throw new Error(MSG.QUANTITY_GREATER_THAN_1)
      }
      return true
    }
  }
}

const performanceIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ID_PERFORMANCE_IS_REQUIRED
  },
  custom: {
    options: async (value: number) => {
      if (typeof value !== 'number') {
        throw new Error(MSG.ID_MUST_BE_NUMBER)
      }
      // eslint-disable-next-line no-useless-catch
      try {
        const performance = await prisma.performance.findUnique({
          where: {
            id: value
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

const idRevenueSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ID_REVENUE_IS_REQUIRED
  },
  custom: {
    options: async (value: number) => {
      if (typeof value !== 'number') {
        throw new Error(MSG.ID_MUST_BE_NUMBER)
      }
      // eslint-disable-next-line no-useless-catch
      try {
        const revenue = await prisma.revenue.findUnique({
          where: {
            id: value
          }
        })
        if (revenue === null) {
          throw new Error(MSG.REVENUE_NOT_FOUND)
        }
        return true
      } catch (error) {
        throw error
      }
    }
  }
}

export const createRevenueValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      description: descriptionSchema,
      unit_caculate: unitCaculateSchema,
      type: typeRevenueSchema,
      price: priceSchema,
      quantity: quantitySchema,
      direction: revenueDirectionSchema,
      performance_id: performanceIdSchema
    },
    ['body']
  )
)

export const updateRevenueValidator = validate(
  checkSchema(
    {
      id: idRevenueSchema,
      name: {
        ...nameSchema,
        optional: true
      },
      description: {
        ...descriptionSchema,
        optional: true
      },
      unit_caculate: {
        ...unitCaculateSchema,
        optional: true
      },
      type: {
        ...typeRevenueSchema,
        optional: true
      },
      price: {
        ...priceSchema,
        optional: true
      },
      quantity: {
        ...quantitySchema,
        optional: true
      }
    },
    ['body']
  )
)

export const getRevenueDetailValidator = validate(
  checkSchema(
    {
      id: idRevenueSchema
    },
    ['params']
  )
)

export const getRevenueDetailQueryValidator = validate(
  checkSchema(
    {
      direction: revenueDirectionSchema
    },
    ['query']
  )
)

export const inputPaginationValidator = validate(
  checkSchema(
    {
      input_limit: {
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
      input_page: {
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

export const outputPaginationValidator = validate(
  checkSchema(
    {
      output_limit: {
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
      output_page: {
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
