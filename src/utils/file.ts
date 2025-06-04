import fs from 'fs'
import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR, UPLOAD_IMAGES_DIR, UPLOAD_IMAGES_TEMP_DIR } from '@/constants/dir'

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
  const directTemps = [UPLOAD_IMAGE_DIR, UPLOAD_IMAGES_DIR, UPLOAD_IMAGE_TEMP_DIR, UPLOAD_IMAGES_TEMP_DIR]
  directTemps.forEach((directTemp) => {
    if (!fs.existsSync(directTemp)) {
      fs.mkdirSync(directTemp, {
        recursive: true
      })
    }
  })
}
