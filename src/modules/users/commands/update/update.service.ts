import { PrismaClient } from '@prisma/client'
import { UpdateUserModel } from './update.model'
import { status } from 'elysia'
import { UploadService } from '@/modules/upload'

const prisma = new PrismaClient()

export abstract class UpdateUserService {
  static async updateUser(
    userId: number,
    body: UpdateUserModel.updateUserBody,
  ) {
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

    const result = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        pictureProfile: fileUrl,
      },
    })

    if (!result) {
      throw status(404, 'ไม่พบข้อมูลผู้ใช้งาน')
    }

    return result
  }
}
