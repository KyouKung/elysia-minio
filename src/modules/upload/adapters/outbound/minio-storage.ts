import { Client } from 'minio'
import { FileStorage } from '../../core/ports/file-storage'
import { generateRandomFromDateTime } from '../../libs/utils/generate-random-from-date-time'

export class MinioStorage implements FileStorage {
  private client: Client
  private bucket: string

  constructor() {
    this.client = new Client({
      endPoint: Bun.env.MINIO_ENDPOINT!,
      port: parseInt(Bun.env.MINIO_PORT!),
      useSSL: Bun.env.MINIO_USE_SSL === 'true',
      accessKey: Bun.env.MINIO_ACCESS_KEY_ID!,
      secretKey: Bun.env.MINIO_SECRET_KEY!,
    })

    this.bucket = Bun.env.MINIO_BUCKET!
  }

  async uploadOne(file: File, subFolder: string, organizationId: number) {
    const subFolderName = subFolder || 'uploads'
    const newFileName = generateRandomFromDateTime()
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = `${organizationId}/${subFolderName}/${newFileName}`

    await this.client.putObject(this.bucket, filePath, buffer, buffer.length, {
      'Content-Type': file.type,
    })

    const url = await this.client.presignedGetObject(this.bucket, filePath)

    return {
      originalName: file.name,
      fileUrl: url,
      fileType: file.type,
      filePath: filePath,
    }
  }

  async uploadMany(files: File[], subFolder: string, organizationId: number) {
    return Promise.all(
      files.map((file) => this.uploadOne(file, subFolder, organizationId)),
    )
  }
}
