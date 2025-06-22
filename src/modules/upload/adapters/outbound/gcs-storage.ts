import { Storage } from '@google-cloud/storage'
import { FileStorage } from '../../core/ports/file-storage'
import { generateRandomFromDateTime } from '../../libs/utils/generate-random-from-date-time'

export class GCSStorage implements FileStorage {
  private storage: Storage
  private bucketName: string
  private gcsServiceAccount: {
    client_email: string
    private_key: string
  }

  constructor() {
    this.gcsServiceAccount = JSON.parse(Bun.env.GCS_SERVICE_ACCOUNT!)
    this.storage = new Storage({
      projectId: Bun.env.GCS_PROJECT_ID,
      credentials: {
        client_email: this.gcsServiceAccount.client_email,
        private_key: this.gcsServiceAccount.private_key,
      },
    })
    this.bucketName = Bun.env.GCS_BUCKET_NAME!
  }

  async uploadOne(file: File, subFolder: string, organizationId: number) {
    const subFolderName = subFolder || 'uploads'
    const newFileName = generateRandomFromDateTime()
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = `${organizationId}/${subFolderName}/${newFileName}`

    const bucket = this.storage.bucket(this.bucketName)
    const gcsFile = bucket.file(filePath)

    await gcsFile.save(buffer, {
      contentType: file.type,
    })

    await gcsFile.makePublic()

    const url = `https://storage.googleapis.com/${this.bucketName}/${filePath}`

    return {
      originalName: file.name,
      fileUrl: url,
      fileType: file.type,
      filePath,
    }
  }

  async uploadMany(files: File[], subFolder: string, organizationId: number) {
    return Promise.all(
      files.map((file) => this.uploadOne(file, subFolder, organizationId)),
    )
  }
}
