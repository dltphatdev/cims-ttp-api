import { isProduction } from '@/constants/config'
import path from 'path'

export const UPLOAD_IMAGE_DIR = path.resolve(isProduction ? '/home/administrator/uploads/image' : 'uploads/image')
export const UPLOAD_FILE_DIR = path.resolve(isProduction ? '/home/administrator/uploads/file' : 'uploads/file')
export const UPLOAD_FILES_DIR = path.resolve(isProduction ? '/home/administrator/uploads/files' : 'uploads/files')
export const UPLOAD_IMAGES_DIR = path.resolve(isProduction ? '/home/administrator/uploads/images' : 'uploads/images')
export const UPLOAD_IMAGE_TEMP_DIR = path.resolve(
  isProduction ? '/home/administrator/uploads/image/temp' : 'uploads/image/temp'
)
export const UPLOAD_IMAGES_TEMP_DIR = path.resolve(
  isProduction ? '/home/administrator/uploads/images/temp' : 'uploads/images/temp'
)
