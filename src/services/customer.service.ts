import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { UpdateCustomerCompanyReqBody } from '@/models/requests/customer.request'
import { CustomerType } from '@prisma/client'

class CustomerService {
  async createService({ name, type, user_id }: { name: string; type: CustomerType; user_id: number }) {
    await prisma.customer.create({
      data: {
        name,
        type,
        creator_id: user_id
      }
    })
    return {
      message: MSG.CREATED_CUSTOMER_SUCCESS
    }
  }

  async updateService(payload: UpdateCustomerCompanyReqBody) {
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
        note: true
      }
    })
    return customer
  }
}

const customerService = new CustomerService()
export default customerService
