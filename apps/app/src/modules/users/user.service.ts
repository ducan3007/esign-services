import { UserPermission, UserType, logger } from '@esign-services/logger'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByIdOrEmail(id_email: string): Promise<UserType> {
    const [user] = await this.prisma.user.findMany({
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
        wallet: {
          select: {
            public_key: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    })
    if (!user) return null

    const user_permission = await this.prisma.role_resource_permission.findMany({
      where: {
        role_id: user.user_role[0].role.id
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

    logger.info('User permission', user_permission)

    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      is_active: user.is_active,
      is_verified: user.is_verified,
      is_master_group: user.is_master_group,
      user_role: {
        name: user.user_role[0].role.name,
        id: user.user_role[0].role.id
      },
      permission: user_permission.map((perm) => {
        return {
          role_id: perm.role_id,
          feature: {
            name: perm.resource.name
          },
          permission_id: perm.permission_id
        }
      }),
      wallet_address: user.wallet,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  async getUserPermission(id_email: string): Promise<any> {
    const user = await this.getUserByIdOrEmail(id_email)

    if (!user) return null
  }

  async adminGetAllUser() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
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
        wallet: {
          select: {
            public_key: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    })

    return users
  }

  private preparePermissions(user_permission: UserPermission[]) {
    const map = {}

    user_permission.forEach((permission) => {})
  }
}
