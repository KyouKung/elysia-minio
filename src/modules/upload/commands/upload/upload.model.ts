import { t } from 'elysia'

export namespace UploadModel {
  export const body = t.Object(
    {
      file: t.File(),
      organizationId: t.String(),
      subFolder: t.String().optional({ default: 'uploads' }),
    },
    {
      multiFile: true,
      contentType: 'multipart/form-data',
    },
  )
  export type body = typeof body.static

  export const response = t.Object({
    message: t.String(),
    data: t.Object({
      originalName: t.String(),
      fileUrl: t.String(),
      fileType: t.String(),
      filePath: t.String(),
    }),
  })
  export type response = typeof response.static
}
