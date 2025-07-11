import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreateCustomerReqBody,
  ListCustomerReqQuery,
  UpdateCustomerCompanyReqBody,
  UpdateCustomerPersonalReqBody
} from '@/models/requests/customer.request'
import { filterPayload } from '@/utils/common'
import { UserRole } from '@prisma/client'
import { omit } from 'lodash'

class CustomerService {
  async createCustomer({ payload, user_id }: { payload: CreateCustomerReqBody; user_id: number }) {
    const userIds = payload.consultantor_ids
    const attachments = payload.attachments
    const _payload = omit(
      {
        ...payload,
        creator_id: user_id,
        date_of_birth: payload?.date_of_birth ? new Date(payload.date_of_birth) : null
      },
      ['consultantor_ids']
    )

    const payloadData = filterPayload(_payload)

    const newCustomer = await prisma.customer.create({
      data: omit(payloadData, ['attachments'])
    })
    const id = newCustomer.id
    if (userIds && userIds.length > 0) {
      await Promise.all(
        userIds.map((userId) => {
          return prisma.customerConsultant.create({
            data: {
              user_id: userId,
              customer_id: id
            }
          })
        })
      )
    }
    if (attachments && attachments.length) {
      await Promise.all(
        attachments.map((attachment) => {
          return prisma.gallery.create({
            data: {
              customer_id: id,
              filename: attachment
            }
          })
        })
      )
    }
    return {
      message: MSG.CREATED_CUSTOMER_SUCCESS,
      id
    }
  }

  async updateCustomerCompany(payload: UpdateCustomerCompanyReqBody) {
    await prisma.customer.update({
      where: {
        id: payload.id
      },
      data: {
        ...omit(payload, ['attachments', 'id', 'consultantor_ids']),
        updated_at: new Date()
      }
    })
    const userIds = payload.consultantor_ids
    if (userIds && userIds.length > 0) {
      await prisma.customerConsultant.deleteMany({
        where: {
          customer_id: payload.id
        }
      })

      await Promise.all(
        userIds.map((userId) =>
          prisma.customerConsultant.create({
            data: {
              user_id: userId,
              customer_id: payload.id
            }
          })
        )
      )
    } else if (userIds && userIds.length === 0) {
      await prisma.customerConsultant.deleteMany({
        where: {
          customer_id: payload.id
        }
      })
    }

    if (payload.attachments?.length) {
      await Promise.all(
        payload.attachments.map((attachment) =>
          prisma.gallery.create({
            data: {
              customer_id: payload.id,
              filename: attachment
            }
          })
        )
      )
    }
    return {
      message: MSG.UPDATED_CUSTOMER_SUCCESS
    }
  }

  async updateCustomerPersonal(payload: UpdateCustomerPersonalReqBody) {
    await prisma.customer.update({
      where: {
        id: payload.id
      },
      data: {
        ...omit(payload, ['attachments', 'id', 'consultantor_ids']),
        date_of_birth: payload?.date_of_birth ? new Date(payload.date_of_birth) : null,
        updated_at: new Date()
      }
    })
    const userIds = payload.consultantor_ids
    if (userIds && userIds.length > 0) {
      await prisma.customerConsultant.deleteMany({
        where: {
          customer_id: payload.id
        }
      })
      await Promise.all(
        userIds.map((userId) =>
          prisma.customerConsultant.create({
            data: {
              user_id: userId,
              customer_id: payload.id
            }
          })
        )
      )
    } else if (userIds && userIds.length === 0) {
      await prisma.customerConsultant.deleteMany({
        where: {
          customer_id: payload.id
        }
      })
    }
    if (payload.attachments?.length) {
      await Promise.all(
        payload.attachments.map((attachment) =>
          prisma.gallery.create({
            data: {
              customer_id: payload.id,
              filename: attachment
            }
          })
        )
      )
    }
    return {
      message: MSG.UPDATED_CUSTOMER_SUCCESS
    }
  }

  async customerList({ payload, role, user_id }: { payload: ListCustomerReqQuery; user_id: number; role: UserRole }) {
    const page = Number(payload?.page) || PAGE
    const limit = Number(payload?.limit) || LIMIT
    // eslint-disable-next-line prefer-const
    let whereCondition: any = {}

    if (payload.name || payload.phone) {
      whereCondition = {
        OR: []
      }

      if (Array.isArray(payload.name)) {
        payload.name.forEach((item) => {
          whereCondition.OR.push({
            name: {
              contains: item.toLocaleLowerCase()
            }
          })
        })
      } else if (payload.name) {
        whereCondition.OR.push({
          name: {
            contains: payload.name.toLocaleLowerCase()
          }
        })
      }

      if (Array.isArray(payload.phone)) {
        payload.phone.forEach((phone) => {
          whereCondition.OR.push({
            phone: {
              contains: phone.toLocaleLowerCase()
            }
          })
        })
      } else if (payload.phone) {
        whereCondition.OR.push({
          phone: {
            contains: payload.phone.toLocaleLowerCase()
          }
        })
      }
    }

    // Supper Admin và Admin xem được toàn bộ khách hàng
    // Người tạo ra khách hàng đó được phép xem
    // Người được phân bổ khách hàng đó được phép xem
    if (role !== UserRole.Admin && role !== UserRole.SuperAdmin) {
      whereCondition = {
        OR: []
      }
      whereCondition.OR.push({
        creator_id: user_id
      })

      const customerIds = await prisma.customerConsultant.findMany({
        where: {
          user_id
        },
        select: {
          customer_id: true
        }
      })

      customerIds.forEach((item) => {
        whereCondition.OR.push({
          id: item.customer_id
        })
      })
    }

    const [customers, totalCustomers] = await Promise.all([
      prisma.customer.findMany({
        where: whereCondition,
        skip: limit * (page - 1),
        take: limit,
        orderBy: {
          created_at: 'desc'
        },
        select: {
          id: true,
          name: true,
          type: true,
          status: true,
          verify: true,
          tax_code: true,
          cccd: true,
          phone: true,
          contact_name: true,
          address_company: true,
          address_personal: true,
          created_at: true,
          creator_id: true,
          creator: {
            select: {
              fullname: true,
              id: true
            }
          },
          consultantor: {
            select: {
              user: {
                select: {
                  fullname: true,
                  id: true,
                  role: true
                }
              }
            }
          },
          attachments: {
            select: {
              filename: true
            }
          }
        }
      }),
      prisma.customer.count({ where: whereCondition })
    ])
    return {
      customers,
      totalCustomers,
      page,
      limit
    }
  }

  async getCustomerDetail({ id, limit, page }: { id: number; page?: string; limit?: string }) {
    const pageQuery = Number(page) || PAGE
    const limitQuery = Number(limit) || LIMIT

    const [customer, totalActivities] = await Promise.all([
      prisma.customer.findUnique({
        where: {
          id
        },
        select: {
          id: true,
          name: true,
          type: true,
          status: true,
          verify: true,
          gender: true,
          tax_code: true,
          cccd: true,
          phone: true,
          email: true,
          surrogate: true,
          website: true,
          contact_name: true,
          address_company: true,
          address_personal: true,
          created_at: true,
          updated_at: true,
          date_of_birth: true,
          creator: {
            select: {
              fullname: true
            }
          },
          consultantor: {
            select: {
              user: {
                select: {
                  fullname: true,
                  id: true
                }
              }
            }
          },
          attachments: {
            select: {
              filename: true
            }
          },
          activityCustomers: {
            skip: limitQuery * (pageQuery - 1),
            take: limitQuery,
            select: {
              id: true,
              name: true,
              customer_id: true,
              address: true,
              phone: true,
              time_start: true,
              time_end: true,
              status: true,
              contact_name: true,
              created_at: true,
              updated_at: true,
              creator: {
                select: {
                  fullname: true
                }
              },
              customer: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      }),
      prisma.activity.count({
        where: {
          customer_id: id
        }
      })
    ])

    return {
      customer,
      totalActivities,
      page: pageQuery,
      limit: limitQuery
    }
  }
}

const customerService = new CustomerService()
export default customerService
