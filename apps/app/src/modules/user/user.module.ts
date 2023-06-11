import { config } from '@esign-services/logger'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService]
})
export class UserModule {}
