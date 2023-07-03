import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../users/user.service'
import { SignatureController } from './signature.controller'
import { SignatureService } from './signature.service'

@Module({
  imports: [],
  controllers: [SignatureController],
  providers: [PrismaService, UserService, SignatureService]
})
export class SignatureModule {}
