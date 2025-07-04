import fs from 'fs'
import { Request } from 'express'
import formidable, { File } from 'formidable'
import {
  UPLOAD_FILE_DIR,
  UPLOAD_FILES_DIR,
  UPLOAD_IMAGE_DIR,
  UPLOAD_IMAGE_TEMP_DIR,
  UPLOAD_IMAGES_DIR,
  UPLOAD_IMAGES_TEMP_DIR
} from '@/constants/dir'

export const getNameFromFullname = (fullname: string) => {
  const fullnameArray = fullname.split('.')
  fullnameArray.pop()
  return fullnameArray.join('')
}

export const getExt = (fullname: string) => {
  const nameArray = fullname.split('.')
  return nameArray[nameArray.length - 1]
}

export const initFolder = () => {
  const directTemps = [
    UPLOAD_IMAGE_DIR,
    UPLOAD_IMAGES_DIR,
    UPLOAD_IMAGE_TEMP_DIR,
    UPLOAD_IMAGES_TEMP_DIR,
    UPLOAD_FILE_DIR,
    UPLOAD_FILES_DIR
  ]
  directTemps.forEach((directTemp) => {
    if (!fs.existsSync(directTemp)) {
      fs.mkdirSync(directTemp, {
        recursive: true
      })
    }
  })
}

export const uploadFile = async (req: Request) => {
  const uploadDir = UPLOAD_FILE_DIR
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 15 * 1024 * 1024, // 15MB
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'file' && allowedTypes.some((type) => mimetype?.startsWith(type) || mimetype === type)
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.file)) {
        return reject(new Error('File not empty'))
      }
      resolve((files.file as File[])[0])
    })
  })
}

export const uploadFiles = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
  const uploadDir = UPLOAD_FILES_DIR
  const form = formidable({
    uploadDir,
    maxFiles: 5,
    maxFileSize: 15 * 1024 * 1024, // 15MB moi file
    maxTotalFileSize: 15 * 1024 * 1024 * 5,
    keepExtensions: true,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid =
        name === 'attachments' && allowedTypes.some((type) => mimetype?.startsWith(type) || mimetype === type)
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.attachments)) {
        return reject(new Error('File not empty'))
      }
      resolve(files.attachments as File[])
    })
  })
}

export const uploadImage = async (req: Request) => {
  const uploadDir = UPLOAD_IMAGE_TEMP_DIR
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 4 * 1024 * 1024, // 4MB
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('File not empty'))
      }
      resolve((files.image as File[])[0])
    })
  })
}

export const uploadImages = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const uploadDir = UPLOAD_IMAGES_TEMP_DIR
  const form = formidable({
    uploadDir,
    maxFiles: 10,
    maxFileSize: 30 * 1024 * 1024, // 30MB
    maxTotalFileSize: 30 * 1024 * 1024 * 10, // 300MB
    keepExtensions: true,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'images' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.images)) {
        return reject(new Error('File not empty'))
      }
      resolve(files.images as File[])
    })
  })
}
