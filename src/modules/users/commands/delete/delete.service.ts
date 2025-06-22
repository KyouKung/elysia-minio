import { PrismaClient } from '@prisma/client'
import { status } from 'elysia'

const prisma = new PrismaClient()

export abstract class DeleteUserService {
  static async deleteUser(userId: number) {
    const result = await prisma.users.delete({
      where: {
        id: userId,
      },
    })

    if (!result) {
      throw status(404, 'ไม่พบข้อมูลผู้ใช้งาน')
    }

    return result
  }
}
