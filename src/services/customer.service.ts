import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreateCustomerReqBody,
  ListCustomerReqQuery,
  UpdateCustomerCompanyReqBody,
  UpdateCustomerPersonalReqBody
} from '@/models/requests/customer.request'
import { forEach, omit } from 'lodash'

class CustomerService {
  async createCustomer({ payload, user_id }: { payload: CreateCustomerReqBody; user_id: number }) {
    const consultantor_ids = payload.consultantor_ids
    const attachments = payload.attachments
    const _payload = omit(
      {
        ...payload,
        creator_id: user_id,
        date_of_birth: payload?.date_of_birth ? new Date(payload.date_of_birth) : null,
        assign_at: payload?.assign_at ? new Date(payload.assign_at) : null
      },
      ['consultantor_ids']
    )
    for (const key in _payload) {
      if (_payload[key as keyof typeof _payload] === undefined || _payload[key as keyof typeof _payload] === '') {
        delete _payload[key as keyof typeof _payload]
      }
    }

    const newCustomer = await prisma.customer.create({
      data: omit(_payload, ['attachments'])
    })
    const id = newCustomer.id
    const userIds = consultantor_ids
    if (userIds && userIds.length > 0) {
      userIds.forEach(async (userId) => {
        await prisma.customerConsultant.create({
          data: {
            user_id: userId,
            customer_id: id
          }
        })
      })
    }
    if (attachments) {
      attachments.forEach(
        async (attachment) =>
          await prisma.gallery.create({
            data: {
              customer_id: id,
              filename: attachment
            }
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
        ...omit(payload, ['attachments']),
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
      userIds.forEach(async (userId) => {
        await prisma.customerConsultant.create({
          data: {
            user_id: userId,
            customer_id: payload.id
          }
        })
      })
    }
    if (payload.attachments) {
      payload.attachments.forEach(
        async (attachment) =>
          await prisma.gallery.create({
            data: {
              customer_id: payload.id,
              filename: attachment
            }
          })
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
        ...omit(payload, ['attachments']),
        date_of_birth: payload?.date_of_birth ? new Date(payload.date_of_birth) : null,
        assign_at: payload?.assign_at ? new Date(payload.assign_at) : null,
        updated_at: new Date()
      }
    })
    if (payload.attachments) {
      payload.attachments.forEach(
        async (attachment) =>
          await prisma.gallery.create({
            data: {
              customer_id: payload.id,
              filename: attachment
            }
          })
      )
    }
    return {
      message: MSG.UPDATED_CUSTOMER_SUCCESS
    }
  }

  async serviceList(payload: ListCustomerReqQuery) {
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
    const [customers, totalCustomers] = await Promise.all([
      prisma.customer.findMany({
        where: whereCondition,
        skip: limit * (page - 1),
        take: limit,
        orderBy: {
          created_at: 'asc'
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
