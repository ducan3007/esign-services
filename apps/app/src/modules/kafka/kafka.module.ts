import { Module } from '@nestjs/common'
import { KafkaService } from './kafka.consumer'
import { UserService } from '../users/user.service'
import { PrismaService } from '../prisma/prisma.service'
import { DocumentConsumer} from './document.consumer'

@Module({
  imports: [],
  providers: [KafkaService, UserService, PrismaService, DocumentConsumer],
  exports: [KafkaService, DocumentConsumer]
})
export class KafkaModule {}
