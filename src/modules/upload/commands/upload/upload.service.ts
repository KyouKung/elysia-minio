import { createStorageFromEnv } from '../../factories/storage-factory'
import { UploadModel } from './upload.model'

const Storage = createStorageFromEnv()

export async function uploadService(body: UploadModel.body) {
  const result = await Storage.uploadOne(
    body.file,
    body.organizationId,
    body.subFolder,
  )

  return {
    message: 'File uploaded successfully',
    data: result,
  }
}
