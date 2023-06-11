import { logger } from '@esign-services/logger'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id
        },
        include: {
          role: {
            include: {
              permissions: {
                select: {
                  permission: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      })

      delete user.password

      return user
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}
