import { Elysia } from 'elysia'
import AppController from './app.controller'
import UsersModule from './modules/users/users.module'
import UploadModule from './modules/upload/upload.module'
import UserFilesModule from './modules/user-files/user-files.module'

const AppModule = new Elysia({
  name: 'AppModule',
  prefix: '/api',
})
  .use(AppController)
  .use(UserFilesModule)
  .use(UsersModule)
  .use(UploadModule)

export default AppModule
