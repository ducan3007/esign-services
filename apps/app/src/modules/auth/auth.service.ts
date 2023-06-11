import { logger } from '@esign-services/logger'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto, SignUpDto } from './dtos/auth.dto'
import { ExceptionBadRequest } from '../../exceptions/controlled_exception'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async sigup(body: SignUpDto) {
    try {
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
            last_name: lastName
          }
        })
        return user
      } else {
        throw new ExceptionBadRequest('Password and confirm password do not match')
      }

    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  async login(body: LoginDto) {
    try {
      const { email, password } = body

      const user = await this.prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (!user) throw new ExceptionBadRequest('Email does not exists')

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) throw new ExceptionBadRequest('Password is incorrect')

      return user
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  async createToken(user: any) {
    try {
      const payload = { email: user.email, sub: user.id }
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}
