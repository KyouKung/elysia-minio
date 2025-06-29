import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { type FileStorage } from '../../core/ports/file-storage'
import { generateRandomFromDateTime } from '../../libs/utils/generate-random-from-date-time'

export class S3Storage implements FileStorage {
  private s3: S3Client

  private bucket: string

  constructor(config: {
    region: string
    accessKeyId: string
    secretAccessKey: string
    bucket: string
  }) {
    this.s3 = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    })
    this.bucket = Bun.env.AWS_BUCKET!
  }

  async uploadOne(file: File, organizationId: string, subFolder?: string) {
    const subFolderName = subFolder || 'uploads'
    const newFileName = generateRandomFromDateTime()
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = `${organizationId}/${subFolderName}/${newFileName}`

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: filePath,
        Body: buffer,
        ContentType: file.type,
      }),
    )

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: filePath,
      ResponseContentDisposition: 'inline',
    })

    const url = await getSignedUrl(this.s3, command)

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
