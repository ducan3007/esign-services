import { UserType } from '@esign-services/logger'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByIdOrEmail(id_email: string): Promise<UserType> {
    const [user_detail] = await this.prisma.user.findMany({
      where: {
        OR: [{ id: id_email }, { email: id_email }]
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        password: true,
        is_active: true,
        is_verified: true,
        is_master_group: true,
        user_role: {
          select: {
            role: {
              select: { name: true, id: true }
            }
          }
        },
        blockchain_address: true,
        createdAt: true,
        updatedAt: true
      }
    })
    if (!user_detail) return null

    const user_permission = await this.prisma.role_resource_permission.findMany({
      where: {
        role_id: user_detail.user_role[0].role.id
      },
      select: {
        role_id: true,
        resource: {
          select: {
            name: true
          }
        },
        permission_id: true
      }
    })

    return {
      id: user_detail.id,
      email: user_detail.email,
      first_name: user_detail.first_name,
      last_name: user_detail.last_name,
      password: user_detail.password,
      is_active: user_detail.is_active,
      is_verified: user_detail.is_verified,
      is_master_group: user_detail.is_master_group,
      user_role: {
        name: user_detail.user_role[0].role.name,
        id: user_detail.user_role[0].role.id
      },
      permission: user_permission
    }
  }

  async adminGetAllUser() {
    const users = await this.prisma.user.findMany({
      include: {
        user_role: true
      }
    })

    return users
  }
}
