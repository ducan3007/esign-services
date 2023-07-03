import { config, logger } from '@esign-services/logger'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto, SignUpDto } from './dtos/auth.dto'
import { ExceptionBadRequest } from '../../exceptions/controlled_exception'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../users/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
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

      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hashPassword,
          first_name: firstName,
          last_name: lastName,
          user_role: {
            create: [{ role: { connect: { id: 1 } } }]
          }
        }
      })
      return user
    } else {
      throw new ExceptionBadRequest('Password and confirm password do not match')
    }
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
}
