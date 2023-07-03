import { UserPermission, UserType } from '@esign-services/logger'
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
        blockchain_address: true,
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
        feature: {
          select: {
            name: true
          }
        },
        permission_id: true
      }
    })

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
      permission: user_permission,
      blockchain_address: user.blockchain_address,
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
        blockchain_address: true,
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

  /**
   * How do we calculate permission?
   *
   *
   *
   * @param perm
   * @returns
   */
  private calculatePermission(perm: any) {
    const CREATE_MASK = 0b100000 // 32
    const READ_MASK = 0b010000 // 16
    const UPDATE_MASK = 0b001000 // 8
    const DELETE_MASK = 0b000100 // 4
    const VERIFIDOCUMENT_MASK = 0b000010 // 2

    const value = perm & 0b111111111111

    return {
      create: (value & CREATE_MASK) === CREATE_MASK,
      read: (value & READ_MASK) === READ_MASK,
      update: (value & UPDATE_MASK) === UPDATE_MASK,
      delete: (value & DELETE_MASK) === DELETE_MASK
    }
  }
}
