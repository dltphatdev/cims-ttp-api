import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreateActivityReqBody,
  GetListActivityReqQuery,
  UpdateActivityReqBody
} from '@/models/requests/activity.request'

class ActivityService {
  async createActivity({ payload, user_id }: { payload: CreateActivityReqBody; user_id: number }) {
    await prisma.activity.create({
      data: {
        ...payload,
        creator_id: user_id,
        time_start: new Date(payload.time_start),
        time_end: new Date(payload.time_end),
        assign_at: payload?.assign_at ? new Date(payload.assign_at) : null
      }
    })
    return {
      message: MSG.CREATE_ACTIVITY_SUCCESSS
    }
  }

  async updateActivity(payload: UpdateActivityReqBody) {
    for (const key in payload) {
      if (
        payload[key as keyof typeof payload] === undefined ||
        payload[key as keyof typeof payload] === '' ||
        payload[key as keyof typeof payload] === null
      ) {
        delete payload[key as keyof typeof payload]
      }
    }
    await prisma.activity.update({
      where: {
        id: payload.id
      },
      data: {
        ...payload,
        time_start: payload.time_start ? new Date(payload.time_start as string) : null,
        time_end: payload.time_end ? new Date(payload.time_end as string) : null,
        updated_at: new Date(),
        assign_at: payload?.assign_at ? new Date(payload.assign_at) : null
      }
    })
    return {
      message: MSG.UPDATE_ACTIVITY_SUCCESS
    }
  }

  async getDetailActivity(id: string) {
    const activity = await prisma.activity.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        name: true,
        customer_id: true,
        address: true,
        phone: true,
        time_start: true,
        time_end: true,
        status: true,
        content: true,
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
    })
    return activity
  }

  async getListActivity(payload: GetListActivityReqQuery) {
    const page = Number(payload?.page) || PAGE
    const limit = Number(payload?.limit) || LIMIT
    // eslint-disable-next-line prefer-const
    let whereCondition: any = {}
    if (payload.name) {
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
    const [activities, totalActivities] = await Promise.all([
      prisma.activity.findMany({
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
      }),
      prisma.activity.count({ where: whereCondition })
    ])
    return {
      activities,
      totalActivities,
      page,
      limit
    }
  }
}

const activityService = new ActivityService()
export default activityService
