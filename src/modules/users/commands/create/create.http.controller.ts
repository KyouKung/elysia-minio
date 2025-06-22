import { Elysia } from 'elysia'

import { CreateUserModel } from './create.model'
import { CreateUserService } from './create.service'

const CreateUserController = new Elysia({
  name: 'CreateUserController',
}).post(
  '/',
  async ({ body }) => {
    const result = await CreateUserService.createUser(body)

    return result
  },
  {
    detail: {
      summary: 'Create a user',
      description: 'Create a user',
    },
    body: CreateUserModel.createUserBody,
    response: {
      201: CreateUserModel.createUserResponse,
    },
  },
)

export default CreateUserController
