import HTTP_STATUS_CODE from '@/constants/httpStatusCode'
import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { ErrorsWithStatus } from '@/models/Errors'
import { TokenPayLoad } from '@/models/requests/user.request'
import { UserRole } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

type SupperAdminAndAdmin = 'SuperAdmin' | 'Admin'

const roles = [UserRole.Admin, UserRole.SuperAdmin]

const isSupperAdmin = (role: UserRole) => (role === UserRole.SuperAdmin ? true : false)

const isSupperAdminAndAdmin = (role: 'SuperAdmin' | 'Admin') => {
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

  const conditionPermission = !isCreatorCustomer && !isSupperAdminAndAdmin(role as SupperAdminAndAdmin)

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

  const conditionPermission = !isCreatorPerformance && !isSupperAdminAndAdmin(role as SupperAdminAndAdmin)
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
