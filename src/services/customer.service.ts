import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreateCustomerReqBody,
  ListCustomerReqQuery,
  UpdateCustomerCompanyReqBody,
  UpdateCustomerPersonalReqBody
} from '@/models/requests/customer.request'
import { omit } from 'lodash'

class CustomerService {
  async createService({ payload, user_id }: { payload: CreateCustomerReqBody; user_id: number }) {
    const attachments = payload.attachments
    const _payload = {
      ...payload,
      creator_id: user_id,
      date_of_birth: payload?.date_of_birth ? new Date(payload.date_of_birth) : null,
      assign_at: payload?.assign_at ? new Date(payload.assign_at) : null,
      consultantor_id: payload.consultantor_id ? payload.consultantor_id : null
    }
    for (const key in _payload) {
      if (_payload[key as keyof typeof _payload] === undefined || _payload[key as keyof typeof _payload] === '') {
        delete _payload[key as keyof typeof _payload]
      }
    }
    const newCustomer = await prisma.customer.create({
      data: omit(_payload, ['attachments'])
    })
    const id = newCustomer.id
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
        date_of_birth: new Date(payload?.date_of_birth as string),
        assign_at: new Date(payload?.assign_at as string),
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
              fullname: true,
              id: true
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

  async getCustomerDetail(id: number) {
    const customer = await prisma.customer.findUnique({
      where: {
        id
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
            fullname: true,
            id: true
          }
        },
        attachments: {
          select: {
            filename: true
          }
        }
      }
    })
    return customer
  }
}

const customerService = new CustomerService()
export default customerService
