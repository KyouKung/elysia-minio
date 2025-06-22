import { Elysia, status } from 'elysia'
import { FindOneUserModel } from './find-one.model'
import { FindOneUserService } from './find-one.service'

const FindOneUserController = new Elysia({
  name: 'FindOneUserController',
}).get(
  '/:userId',
  async ({ params }) => {
    const { userId } = params

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

    const result = await FindOneUserService.findOneUser(userIdNumber)
    return result
  },
  {
    detail: {
      summary: 'Find One User',
      description: 'Find One User by User Id',
    },
    response: {
      200: FindOneUserModel.FindOneUserResponse,
      400: FindOneUserModel.FindOneUserResponseBadRequest,
      404: FindOneUserModel.FindOneUserResponseNotFound,
    },
  },
)

export default FindOneUserController
