import { Elysia } from 'elysia'
import CreateUserController from './commands/create/create.http.controller'
import UpdateUserController from './commands/update/update.http.controller'
import FindOneUserController from './queries/find-one/find-one.http.controller'
import DeleteUserController from './commands/delete/delete.http.controller'

const UsersV1Route = new Elysia({
  name: 'UsersV1Route',
  prefix: 'v1/users',
  tags: ['v1', 'Users'],
})
  .use(CreateUserController)
  .use(UpdateUserController)
  .use(DeleteUserController)
  .use(FindOneUserController)

const UsersModule = new Elysia({
  name: 'UsersModule',
}).use(UsersV1Route)

export default UsersModule
