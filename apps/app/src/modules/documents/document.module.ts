import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../users/user.service'
import { DocumentController } from './document.controller'
import { DocumentService } from './document.service'
import { IPFSService } from '../ipfs/ipfs.service'
import { IPFSModule } from '../ipfs/ipfs.module'

@Module({
  imports: [IPFSModule],
  controllers: [DocumentController],
  providers: [PrismaService, UserService, DocumentService]
})
export class DocumentModule {}
