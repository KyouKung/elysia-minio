import { PrismaClient } from '@prisma/client'
import { CreateUserModel } from './create.model'
import { UploadService } from '../../../upload/application/upload.service'

const prisma = new PrismaClient()

export abstract class CreateUserService {
  static async createUser(body: CreateUserModel.createUserBody) {
    let fileUrl: string | undefined

    const file = body.file
    if (file) {
      const uploadResult = await UploadService.getInstance().uploadOne(
        file,
        'profile',
        1,
      )
      fileUrl = uploadResult.fileUrl
    }

    const result = await prisma.users.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        pictureProfile: fileUrl,
      },
    })

    return result
  }
}
