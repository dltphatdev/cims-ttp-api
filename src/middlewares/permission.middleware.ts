import HTTP_STATUS_CODE from '@/constants/httpStatusCode'
import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { ErrorsWithStatus } from '@/models/Errors'
import { TokenPayLoad } from '@/models/requests/user.request'
import { UserRole } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

type SupperAdminAndAdmin = 'SuperAdmin' | 'Admin'

const roles = [UserRole.Admin, UserRole.SuperAdmin]

const isSupperAdminAndAdmin = (role: SupperAdminAndAdmin) => {
  const condition = roles.includes(role)
  return condition
}

export const permissionGetDetailCustomerValidator = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { user_id, role } = req.decode_authorization as TokenPayLoad
  const idCustomer = req.params.id
  const customer = await prisma.customer.findUnique({
    where: {
      id: Number(idCustomer)
    }
  })
  const isCreatorCustomer = customer?.creator_id === user_id

  const customerConsultant = await prisma.customerConsultant.findFirst({
    where: {
      customer_id: Number(idCustomer),
      user_id
    }
  })

  const isCustomerConsultant = customerConsultant !== null

  const conditionPermission =
    !isCreatorCustomer && !isCustomerConsultant && !isSupperAdminAndAdmin(role as SupperAdminAndAdmin)

  if (conditionPermission) {
    return next(
      new ErrorsWithStatus({
        message: MSG.NO_PERMISSION_ALLOW_PAGE,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

export const permissionGetPerformanceDetailValidator = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { user_id, role } = req.decode_authorization as TokenPayLoad
  const idPerformance = req.params.id
  const performance = await prisma.performance.findUnique({
    where: {
      id: Number(idPerformance)
    }
  })

  const isCreatorPerformance = performance?.creator_id === user_id

  const idCustomer = performance?.customer_id

  const customerConsultant = await prisma.customerConsultant.findFirst({
    where: {
      customer_id: Number(idCustomer),
      user_id
    }
  })

  const isCustomerConsultant = customerConsultant !== null

  const conditionPermission =
    !isCreatorPerformance && !isCustomerConsultant && !isSupperAdminAndAdmin(role as SupperAdminAndAdmin)
  if (conditionPermission) {
    return next(
      new ErrorsWithStatus({
        message: MSG.NO_PERMISSION_ALLOW_PAGE,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

export const permissionActivityDetailValidator = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const idActivity = req.params.id
  const { user_id, role } = req.decode_authorization as TokenPayLoad
  const activity = await prisma.activity.findUnique({
    where: {
      id: Number(idActivity)
    }
  })

  const isCreatorPerformance = activity?.creator_id === user_id
  const conditionActivity = !isCreatorPerformance && !isSupperAdminAndAdmin(role as SupperAdminAndAdmin)
  if (conditionActivity) {
    return next(
      new ErrorsWithStatus({
        message: MSG.NO_PERMISSION_ALLOW_PAGE,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

export const permissionRevenueValidator = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { user_id, role } = req.decode_authorization as TokenPayLoad
  const idPerformance = req.params.id
  const performance = await prisma.performance.findUnique({
    where: {
      id: Number(idPerformance)
    }
  })

  const isCreatorCreateRevenue = performance?.creator_id === user_id
  const conditionRevenue = !isCreatorCreateRevenue && !isSupperAdminAndAdmin(role as SupperAdminAndAdmin)
  if (conditionRevenue) {
    return next(
      new ErrorsWithStatus({
        message: MSG.NO_PERMISSION_ALLOW_PAGE,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

export const permissionUserValidator = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { user_id, role } = req.decode_authorization as TokenPayLoad
  const idUser = req.params.id
  const user = await prisma.user.findUnique({
    where: {
      id: Number(idUser)
    }
  })

  const isCreatorUser = user?.id === user_id
  const conditionUser = !isCreatorUser && !isSupperAdminAndAdmin(role as SupperAdminAndAdmin)
  if (conditionUser) {
    return next(
      new ErrorsWithStatus({
        message: MSG.NO_PERMISSION_ALLOW_PAGE,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

export const permissionDocumentDetailValidator = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { user_id, role } = req.decode_authorization as TokenPayLoad
  const idDocument = req.params.id
  const documentRow = await prisma.document.findUnique({
    where: {
      id: Number(idDocument)
    }
  })
  const isCreatorDocument = documentRow?.creator_id === user_id

  const conditionPermission = !isCreatorDocument && !isSupperAdminAndAdmin(role as SupperAdminAndAdmin)

  if (conditionPermission) {
    return next(
      new ErrorsWithStatus({
        message: MSG.NO_PERMISSION_ALLOW_PAGE,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

export const permissionCreateDocumentValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.decode_authorization as TokenPayLoad
  if (!isSupperAdminAndAdmin(role as SupperAdminAndAdmin)) {
    return next(
      new ErrorsWithStatus({
        message: MSG.NO_PERMISSION_ALLOW_PAGE,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    )
  }
  next()
}

// export const permissionRevenuesValidator = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
//   const { role, user_id } = req.decode_authorization as TokenPayLoad
//   const idPerformance = req.params.id
//   const performance = await prisma.performance.findUnique({
//     where: {
//       id: Number(idPerformance)
//     }
//   })
//   if (!isSupperAdminAndAdmin(role as SupperAdminAndAdmin)) {
//     return next(
//       new ErrorsWithStatus({
//         message: MSG.NO_PERMISSION_ALLOW_PAGE,
//         status: HTTP_STATUS_CODE.FORBIDDEN
//       })
//     )
//   }
//   next()
// }
