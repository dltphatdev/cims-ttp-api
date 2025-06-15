import fs from 'fs'
import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { getNameFromFullname, uploadFile, uploadFiles, uploadImage } from '@/utils/file'
import { UPLOAD_IMAGE_DIR } from '@/constants/dir'
import { CONFIG_ENV } from '@/constants/config'
import { MediaType } from '@/constants/enum'

class MediaService {
  async handleUploadFile(req: Request) {
    const file = await uploadFile(req)
    const fileName = file.newFilename
    return {
      url: CONFIG_ENV.SERVER_URL,
      filename: fileName,
      type: MediaType.File
    }
  }

  async handleUploadFiles(req: Request) {
    const files = await uploadFiles(req)
    const result: {
      url: string
      filename: string
      type: MediaType.File
    }[] = await Promise.all(
      files.map(async (file) => {
        const fileName = file.newFilename
        return {
          url: CONFIG_ENV.SERVER_URL,
          filename: fileName,
          type: MediaType.File
        }
      })
    )
    return result
  }

  async handleUploadImage(req: Request) {
    const file = await uploadImage(req)
    const fileName = getNameFromFullname(file.newFilename)
    const newFileName = `${fileName}.jpg`
    const newPath = path.resolve(UPLOAD_IMAGE_DIR, newFileName)
    await sharp(file.filepath).jpeg().toFile(newPath)
    fs.unlinkSync(file.filepath)
    return {
      url: CONFIG_ENV.SERVER_URL,
      filename: newFileName,
      type: MediaType.Image
    }
  }
}

const mediaService = new MediaService()
export default mediaService
