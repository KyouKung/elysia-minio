import { Storage } from '@google-cloud/storage'
import { type FileStorage } from '../../core/ports/file-storage'
import { generateRandomFromDateTime } from '../../libs/utils/generate-random-from-date-time'

export class GCSStorage implements FileStorage {
  private storage: Storage

  private bucketName: string

  private gcsServiceAccount: {
    client_email: string
    private_key: string
  }

  constructor(config: {
    projectId: string
    bucket: string
    credentials: {
      client_email: string
      private_key: string
    }
  }) {
    this.gcsServiceAccount = config.credentials
    this.storage = new Storage({
      projectId: config.projectId,
      credentials: {
        client_email: this.gcsServiceAccount.client_email,
        private_key: this.gcsServiceAccount.private_key,
      },
    })
    this.bucketName = config.bucket
  }

  async uploadOne(file: File, organizationId: string, subFolder?: string) {
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

  async uploadMany(files: File[], organizationId: string, subFolder?: string) {
    return Promise.all(
      files.map((file) => this.uploadOne(file, organizationId, subFolder)),
    )
  }
}
