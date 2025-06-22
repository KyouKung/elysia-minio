import { Elysia } from 'elysia'
import CreateUserFileController from './commands/create/create.http.controller'

const UserFilesV1Route = new Elysia({
  name: 'UserFilesV1Route',
  prefix: 'v1/user-files',
  tags: ['v1', 'UserFiles'],
}).use(CreateUserFileController)

const UserFilesModule = new Elysia({
  name: 'UserFilesModule',
}).use(UserFilesV1Route)

export default UserFilesModule
