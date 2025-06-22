import { Elysia } from 'elysia'
import UploadController from './controller/upload.http.controller'
import { UploadService } from './application/upload.service'

const UploadModule = new Elysia({
  name: 'UploadModule',
  prefix: 'v1',
  tags: ['v1', 'Upload'],
}).use(UploadController)

export default UploadModule
export { UploadService }
