import { FeatureRoleMapping, PermissionCode as PERM, Role, config } from '@esign-services/logger'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { user } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { ExceptionBadRequest } from '../../exceptions/controlled_exception'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../users/user.service'
import { LoginDto, SignUpDto } from './dtos/auth.dto'

const CREATE_MASK = 2
const READ_MASK = 4
const UPDATE_MASK = 8
const DELETE_MASK = 16
const VERIFY_DOCUMENT_MASK = 32
const SIGN_DOCUMENT_MASK = 64
const ASSIGN_MASK = 128
const ENABLE_MASK = 256

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  public async sigup(body: SignUpDto) {
    const { email, password, confirmPassword, firstName, lastName } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (user) throw new ExceptionBadRequest('Email already exists')

    if (password === confirmPassword) {
      const hashPassword = await bcrypt.hash(password, 10)

      const user = await this.createUser(
        { email: email, password: hashPassword, first_name: firstName, last_name: lastName } as user,
        Role.Admin
      )
      return user
    } else {
      throw new ExceptionBadRequest('Password and confirm password do not match')
    }
  }

  public async createUser(user: user, role: Role) {
    const { email, password, first_name, last_name } = user

    const userRole = await this.prisma.role.findUnique({
      where: {
        name: role
      }
    })
    let user_feature = {}
    const userFeature = await this.prisma.feature.findMany()

    if (role === Role.Admin) {
      user_feature = {
        create: userFeature.map((feature) => {
          return {
            feature: { connect: { id: feature.id } },
            permission_id:
              PERM['read'] |
              PERM['create'] |
              PERM['update'] |
              PERM['delete'] |
              PERM['verifyDocument'] |
              PERM['signDocument'] |
              PERM['assign'] |
              PERM['enable']
          }
        })
      }
    }

    console.log('user_feature', user_feature)

    const newUser = await this.prisma.user.create({
      data: {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        user_role: {
          create: [{ role: { connect: { id: userRole.id } } }]
        },
        group: {
          create: { name: `${first_name} ${last_name} Group` }
        },
        user_feature: user_feature
      }
    })

    return newUser
  }

  public async login(body: LoginDto) {
    const { email, password } = body

    const user = await this.userService.getUserByIdOrEmail(email)

    if (!user) throw new ExceptionBadRequest('Email does not exists')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new ExceptionBadRequest('Password is incorrect')

    delete user.password

    const token = await this.createToken({
      payload: user
    })

    return {
      access_token: token,
      user: user
    }
  }

  public async createToken(payload: any): Promise<string | undefined> {
    return this.jwtService.signAsync(payload, {
      secret: config.get('JWT_SECRET'),
      expiresIn: `${config.get('JWT_EXPIRATION_TIME')}`
    })
  }

  public async decodeToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: config.get('JWT_SECRET')
    })
  }

  private calculatePermission(role: Role) {}
}
