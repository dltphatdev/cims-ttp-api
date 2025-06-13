import { prisma } from '@/index'

class GalleryService {
  async createFilesAttachment({ filename, customer_id }: { customer_id: number; filename: string }) {
    await prisma.gallery.create({
      data: {
        filename,
        customer_id
      }
    })
  }
}

const galleryService = new GalleryService()
export default galleryService
