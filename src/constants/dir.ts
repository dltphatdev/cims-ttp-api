import { isProduction } from '@/constants/config'
import path from 'path'

export const UPLOAD_IMAGE_DIR = path.resolve(isProduction ? '/home/cimsprod/uploads/image' : 'uploads/image')
export const UPLOAD_FILE_DIR = path.resolve(isProduction ? '/home/cimsprod/uploads/file' : 'uploads/file')
export const UPLOAD_FILES_DIR = path.resolve(isProduction ? '/home/cimsprod/uploads/files' : 'uploads/files')
export const UPLOAD_IMAGES_DIR = path.resolve(isProduction ? '/home/cimsprod/uploads/images' : 'uploads/images')
export const UPLOAD_IMAGE_TEMP_DIR = path.resolve(
  isProduction ? '/home/cimsprod/uploads/image/temp' : 'uploads/image/temp'
)
export const UPLOAD_IMAGES_TEMP_DIR = path.resolve(
  isProduction ? '/home/cimsprod/uploads/images/temp' : 'uploads/images/temp'
)
