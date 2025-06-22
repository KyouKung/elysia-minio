import { Prisma, PrismaClient } from '@prisma/client'
import { UploadService } from '../../../upload/application/upload.service'
import { CreateUserFileModel } from './create.model'
import { UploadFileResponse } from '@/modules/upload'

const prisma = new PrismaClient()

export abstract class CreateUserFileService {
  static async createUserFile(
    userId: number,
    body: CreateUserFileModel.createUserFileBody,
  ) {
    let fileUrl: UploadFileResponse[] | undefined

    const file = body.files
    if (file) {
      const uploadResult = await UploadService.getInstance().uploadMany(
        file,
        'user-files',
        1,
      )
      fileUrl = uploadResult
    }

    const dataFiles = fileUrl?.map((url) => ({
      fileUrl: url.fileUrl,
      fileOriginalName: url.originalName,
      fileType: url.fileType,
      filePath: url.filePath,
      userId: userId,
    }))

    await prisma.userFiles.createMany({
      data: dataFiles ?? [],
    })

    return dataFiles
  }
}
