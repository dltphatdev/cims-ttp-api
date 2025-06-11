import { CustomerType } from '@prisma/client'

export interface CreateCustomerReqBody {
  name: string
  type: CustomerType
}

export interface UpdateCustomerCompanyReqBody {
  id: number
  tax_code: string
  name?: string
  website?: string
  surrogate?: string
  address_company?: string
  phone?: string
  email?: string
  contact_name?: string
  attachment?: string
  note?: string
}
