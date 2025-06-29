import { Elysia } from 'elysia'
import UploadHttpController from './commands/upload/upload.http.controller'

const UploadModule = new Elysia({
  name: 'UploadModule',
  prefix: 'v1',
  tags: ['v1', 'Upload'],
}).use(UploadHttpController)

export default UploadModule
export { UploadModule }
