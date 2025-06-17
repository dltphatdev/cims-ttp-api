import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreatePerformanceReqBody,
  ListPerformanceReqQuery,
  UpdatePerformanceReqBody
} from '@/models/requests/performance.request'

class PerformanceService {
  async createPerformance(payload: CreatePerformanceReqBody) {
    const _payload = payload.assign_at ? { ...payload, assign_at: new Date(payload.assign_at) } : payload
    const performance = await prisma.performance.create({
      data: _payload
    })
    const id = performance.id
    return {
      message: MSG.CREATE_PERFORMANCE_SUCCESS,
      id
    }
  }

  async getPerformance(id: string) {
    const performance = await prisma.performance.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        name: true,
        customer_id: true,
        creator_id: true,
        note: true,
        status: true,
        operating_cost: true,
        customer_care_cost: true,
        commission_cost: true,
        diplomatic_cost: true,
        reserve_cost: true,
        customer_cost: true,
        created_at: true,
        updated_at: true,
        creator: {
          select: {
            fullname: true
          }
        },
        customer: {
          select: {
            name: true,
            id: true
          }
        },
        revenues: {
          select: {
            id: true,
            name: true,
            description: true,
            unit_caculate: true,
            type: true,
            performance_id: true,
            price: true,
            quantity: true,
            direction: true,
            created_at: true,
            updated_at: true
          }
        }
      }
    })
    return performance
  }

  async performanceList(payload: ListPerformanceReqQuery) {
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
    }
    const [performances, totalPerformances] = await Promise.all([
      prisma.performance.findMany({
        where: whereCondition,
        skip: limit * (page - 1),
        take: limit,
        orderBy: {
          created_at: 'asc'
        },
        select: {
          id: true,
          name: true,
          customer_id: true,
          creator_id: true,
          note: true,
          status: true,
          operating_cost: true,
          customer_care_cost: true,
          commission_cost: true,
          diplomatic_cost: true,
          reserve_cost: true,
          customer_cost: true,
          created_at: true,
          updated_at: true,
          creator: {
            select: {
              fullname: true
            }
          },
          customer: {
            select: {
              name: true,
              id: true
            }
          },
          revenues: {
            select: {
              id: true,
              name: true,
              description: true,
              unit_caculate: true,
              type: true,
              performance_id: true,
              price: true,
              quantity: true,
              direction: true,
              created_at: true,
              updated_at: true
            }
          }
        }
      }),
      prisma.performance.count({ where: whereCondition })
    ])
    return {
      performances,
      totalPerformances,
      page,
      limit
    }
  }

  async updatePerformance(payload: UpdatePerformanceReqBody) {
    const _payload = {
      ...payload,
      assign_at: payload?.assign_at ? new Date(payload.assign_at) : null
    }
    for (const key in _payload) {
      if (
        _payload[key as keyof typeof _payload] === undefined ||
        _payload[key as keyof typeof _payload] === '' ||
        _payload[key as keyof typeof _payload] === null
      ) {
        delete _payload[key as keyof typeof _payload]
      }
    }
    await prisma.performance.update({
      where: {
        id: _payload.id
      },
      data: {
        ..._payload,
        updated_at: new Date()
      }
    })
    return {
      message: MSG.UPDATE_PERFORMANCE_SUCCESS
    }
  }
}

const performanceService = new PerformanceService()
export default performanceService
