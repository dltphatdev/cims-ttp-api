import MSG from '@/constants/msg'
import { prisma } from '@/index'
import { CreateRevenueReqBody, UpdateRevenueReqBody } from '@/models/requests/revenue.request'
import { RevenueDirection } from '@prisma/client'

class RevenueService {
  async createRevenue(payload: CreateRevenueReqBody) {
    const revenue = await prisma.revenue.create({
      data: payload
    })
    return revenue
  }

  async updateRevenue(payload: UpdateRevenueReqBody) {
    for (const key in payload) {
      if (
        payload[key as keyof typeof payload] === undefined ||
        payload[key as keyof typeof payload] === '' ||
        payload[key as keyof typeof payload] === null
      ) {
        delete payload[key as keyof typeof payload]
      }
    }
    await prisma.revenue.update({
      where: {
        id: payload.id
      },
      data: {
        ...payload,
        updated_at: new Date()
      }
    })
    return {
      message: MSG.UPDATE_REVENUE_SUCCESS
    }
  }

  async getRevenue({ id, direction }: { id: string; direction: RevenueDirection }) {
    const revenue = await prisma.revenue.findFirst({
      where: {
        id: Number(id),
        direction
      }
    })

    return revenue
  }
}

const revenueService = new RevenueService()
export default revenueService
