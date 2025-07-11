import MSG from '@/constants/msg'
import { LIMIT, PAGE } from '@/constants/pagination'
import { prisma } from '@/index'
import {
  CreateDocumentReqBody,
  GetListDocumentReqQuery,
  UpdateDocumentReqBody
} from '@/models/requests/document.request'
import { UserRole } from '@prisma/client'
import { omit } from 'lodash'

interface CreateDocumentServicePayLoad extends CreateDocumentReqBody {
  user_id: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UpdateDocumentServicePayload extends UpdateDocumentReqBody {}

interface DocumentListServicePayload {
  payload: GetListDocumentReqQuery
  user_id: number
  role: UserRole
}

class DocumentService {
  async create({ user_id, ...payload }: CreateDocumentServicePayLoad) {
    const attachment = payload.attachment
    for (const key in payload) {
      if (payload[key as keyof typeof payload] === undefined || payload[key as keyof typeof payload] === '') {
        delete payload[key as keyof typeof payload]
      }
    }
    const documentRow = await prisma.document.create({
      data: {
        ...omit(payload, ['attachment']),
        creator_id: user_id
      }
    })

    const id = documentRow.id

    const lastVersionFileAttachment = await prisma.gallery.findFirst({
      where: {
        document_id: id
      },
      select: {
        version: true
      },
      orderBy: { version: 'desc' }
    })

    const versionFileAttachment = lastVersionFileAttachment ? Number(lastVersionFileAttachment) + 1 : 0

    await prisma.gallery.create({
      data: {
        document_id: id,
        filename: attachment,
        version: versionFileAttachment
      }
    })

    return {
      message: MSG.CREATED_DOCUMENT_SUCCESS,
      id
    }
  }

  async update(payload: UpdateDocumentServicePayload) {
    for (const key in payload) {
      if (payload[key as keyof typeof payload] === undefined || payload[key as keyof typeof payload] === '') {
        delete payload[key as keyof typeof payload]
      }
    }
    await prisma.document.update({
      where: {
        id: payload.id
      },
      data: omit(payload, ['id'])
    })
    return {
      message: MSG.UPDATED_DOCUMENT_SUCCESS
    }
  }

  async getDocumentDetail(id: number) {
    const [document, gallery] = await Promise.all([
      prisma.document.findUnique({
        where: {
          id
        }
      }),
      prisma.gallery.findMany({
        where: {
          document_id: id
        },
        select: {
          id: true,
          user_id: true,
          filename: true,
          version: true,
          created_at: true
        },
        orderBy: {
          version: 'desc'
        }
      })
    ])
    return { document, gallery }
  }

  async documentList({ payload, role, user_id }: DocumentListServicePayload) {
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

    if (role !== UserRole.Admin && role !== UserRole.SuperAdmin) {
      whereCondition = {
        OR: []
      }
      whereCondition.OR.push({
        creator_id: user_id
      })
    }

    const [documents, totalDocuments] = await Promise.all([
      prisma.document.findMany({
        where: whereCondition,
        skip: limit * (page - 1),
        take: limit,
        select: {
          id: true,
          name: true,
          creator: {
            select: {
              fullname: true
            }
          },
          description: true,
          creator_id: true,
          created_at: true,
          updated_at: true
        },
        orderBy: {
          created_at: 'desc'
        }
      }),
      prisma.customer.count({ where: whereCondition })
    ])
    return {
      documents,
      totalDocuments,
      page,
      limit
    }
  }
}

const documentService = new DocumentService()
export default documentService
