import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../users/user.service'
import { DocumentController } from './document.controller'
import { DocumentService } from './document.service'
import { IPFSService } from '../ipfs/ipfs.service'

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [PrismaService, UserService, DocumentService, IPFSService]
})
export class DocumentModule {}
