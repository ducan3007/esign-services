import { Module } from '@nestjs/common'
import { IPFSService } from '../ipfs/ipfs.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../users/user.service'
import { EmailController } from './email.controller'
import { EmailService } from './email.service'

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [PrismaService, UserService]
})
export class EmailModule {}
