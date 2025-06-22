import { Elysia, status } from 'elysia'
import { CreateUserFileModel } from './create.model'
import { CreateUserFileService } from './create.service'

const CreateUserFileController = new Elysia({
  name: 'CreateUserFileController',
}).post(
  '/:userId',
  async ({ params, body }) => {
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

    const result = await CreateUserFileService.createUserFile(
      userIdNumber,
      body,
    )

    return result
  },
  {
    detail: {
      summary: 'Create a user file',
      description: 'Create a user file',
    },
    body: CreateUserFileModel.createUserFileBody,
    response: {
      201: CreateUserFileModel.createUserFileResponse,
      400: CreateUserFileModel.createUserFileResponseBadRequest,
      404: CreateUserFileModel.createUserFileResponseNotFound,
    },
  },
)

export default CreateUserFileController
