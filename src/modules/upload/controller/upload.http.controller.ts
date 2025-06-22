import { Elysia, t } from 'elysia'
import { UploadService } from '../application/upload.service'

const uploadService = UploadService.getInstance()

const UploadController = new Elysia({
  name: 'UploadController',
})
  .post(
    '/upload',
    async ({ body }) => {
      return uploadService.uploadOne(body.file, 'profile', 1)
    },
    {
      detail: {
        summary: 'Upload a file',
        description: 'Upload a file',
      },
      body: t.Object({
        file: t.File(),
      }),
      response: {
        200: t.Object({
          originalName: t.String(),
          fileUrl: t.String(),
          fileType: t.String(),
          filePath: t.String(),
        }),
      },
    },
  )
  .post(
    '/uploads',
    async ({ body }) => {
      return uploadService.uploadMany(body.files, 'profile', 1)
    },
    {
      detail: {
        summary: 'Upload multiple files',
        description: 'Upload multiple files',
      },
      body: t.Object({
        files: t.Array(t.File()),
      }),
      response: {
        200: t.Array(
          t.Object({
            originalName: t.String(),
            fileUrl: t.String(),
            fileType: t.String(),
            filePath: t.String(),
          }),
        ),
      },
    },
  )

export default UploadController
