import { Elysia, status } from 'elysia'
import { UpdateUserService } from './update.service'
import { UpdateUserModel } from './update.model'

const UpdateUserController = new Elysia({
  name: 'UpdateUserController',
}).put(
  '/:userId',
  async ({ params, body }) => {
    const userId = params.userId

    if (!userId) {
      throw status(400, 'User ID is required')
    }

    const userIdNumber = Number(userId)
    if (
      isNaN(userIdNumber) ||
      userIdNumber <= 0 ||
      !Number.isInteger(userIdNumber)
    ) {
      throw status(400, 'User ID must be a positive integer')
    }
    const result = await UpdateUserService.updateUser(userIdNumber, body)

    return result
  },
  {
    detail: {
      summary: 'Update a user',
      description: 'Update a user by id',
    },
    body: UpdateUserModel.updateUserBody,
    response: {
      200: UpdateUserModel.updateUserResponse,
      400: UpdateUserModel.updateUserResponseBadRequest,
      404: UpdateUserModel.updateUserResponseNotFound,
    },
  },
)

export default UpdateUserController
