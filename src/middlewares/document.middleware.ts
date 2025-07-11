import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { validate } from '@/utils/validation'
import { checkSchema, ParamSchema } from 'express-validator'

const nameSchema: ParamSchema = {
  isString: {
    errorMessage: MSG.NAME_DOCUMENT_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 160
    },
    errorMessage: MSG.NAME_DOCUMENT_LENGTH
  }
}

const descriptionSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.DESCRIPTION_IS_REQUIRED
  },
  isString: {
    errorMessage: MSG.DESCRIPTION_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      max: 2000
    },
    errorMessage: MSG.DESCRIPTION_MAX_LENGTH
  }
}

const attachmentSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MSG.ATTACHMENT_IS_REQUIRED
  },
  isString: {
    errorMessage: MSG.ATTACHMENT_MUST_BE_STRING
  },
  trim: true
}

export const createDocumentValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      description: {
        ...descriptionSchema,
        optional: true
      },
      attachment: attachmentSchema
    },
    ['body']
  )
)

export const updateDocumentValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: MSG.ID_IS_REQUIRED
        },
        isInt: {
          errorMessage: MSG.ID_MUST_BE_INTEGER
        },
        custom: {
          options: async (value: number) => {
            const document = await prisma.document.findUnique({
              where: {
                id: value
              }
            })
            if (!document) {
              throw new Error(MSG.DOCUMENT_NOT_FOUND)
            }
          }
        }
      },
      name: nameSchema,
      description: {
        ...descriptionSchema,
        optional: true
      }
    },
    ['body']
  )
)

export const getDocumentDetailValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: MSG.ID_IS_REQUIRED
        },
        custom: {
          options: async (value: string) => {
            const document = await prisma.document.findUnique({
              where: {
                id: Number(value)
              }
            })
            if (!document) {
              throw new Error(MSG.DOCUMENT_NOT_FOUND)
            }
          }
        }
      }
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
