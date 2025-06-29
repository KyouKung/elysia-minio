import Elysia from 'elysia'
import { UploadModel } from './upload.model'
import { uploadService } from './upload.service'

const UploadHttpController = new Elysia({ name: 'UploadHttpController' }).post(
  '/',
  async ({ body }) => {
    const result = await uploadService(body as UploadModel.body)

    return result
  },
  {
    detail: {
      summary: 'Upload file',
      description: 'Upload file to storage',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: UploadModel.body,
          },
        },
      },
    },
    response: {
      200: UploadModel.response,
    },
  },
)

export default UploadHttpController
