import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreateCustomerReqBody,
  ListCustomerReqQuery,
  UpdateCustomerCompanyReqBody,
  UpdateCustomerPersonalReqBody
} from '@/models/requests/customer.request'

class CustomerService {
  async createService({ payload, user_id }: { payload: CreateCustomerReqBody; user_id: number }) {
    const newCustomer = await prisma.customer.create({
      data: {
        ...payload,
        creator_id: user_id,
        date_of_birth: new Date(payload?.date_of_birth as string),
        assign_at: new Date(payload?.assign_at as string)
      }
    })
    const id = newCustomer.id
    return {
      message: MSG.CREATED_CUSTOMER_SUCCESS,
      data: id
    }
  }

  async updateCustomerCompany(payload: UpdateCustomerCompanyReqBody) {
    const customer = await prisma.customer.update({
      where: {
        id: payload.id
      },
      data: payload,
      select: {
        id: true,
        tax_code: true,
        name: true,
        website: true,
        surrogate: true,
        address_company: true,
        phone: true,
        email: true,
        contact_name: true,
        attachment: true,
        note: true,
        creator: {
          select: {
            fullname: true
          }
        },
        consultantor: {
          select: {
            fullname: true
          }
        }
      }
    })
    return customer
  }

  async updateCustomerPersonal(payload: UpdateCustomerPersonalReqBody) {
    const customer = await prisma.customer.update({
      where: {
        id: payload.id
      },
      data: {
        ...payload,
        date_of_birth: new Date(payload?.date_of_birth as string),
        assign_at: new Date(payload?.assign_at as string)
      },
      select: {
        id: true,
        name: true,
        date_of_birth: true,
        email: true,
        phone: true,
        gender: true,
        attachment: true,
        note: true,
        address_personal: true,
        creator: {
          select: {
            fullname: true
          }
        },
        consultantor: {
          select: {
            fullname: true
          }
        }
      }
    })
    return customer
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
              fullname: true
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
}

const customerService = new CustomerService()
export default customerService
