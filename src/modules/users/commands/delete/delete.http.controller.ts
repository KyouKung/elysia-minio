import { Elysia, status } from 'elysia'
import { DeleteUserService } from './delete.service'
import { DeleteUserModel } from './delete.model'

const DeleteUserController = new Elysia({
  name: 'DeleteUserController',
}).put(
  '/:userId',
  async ({ params }) => {
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
    const result = await DeleteUserService.deleteUser(userIdNumber)

    return result
  },
  {
    detail: {
      summary: 'Update a user',
      description: 'Update a user by id',
    },
    response: {
      200: DeleteUserModel.deleteUserResponse,
      400: DeleteUserModel.deleteUserResponseBadRequest,
      404: DeleteUserModel.deleteUserResponseNotFound,
    },
  },
)

export default DeleteUserController
