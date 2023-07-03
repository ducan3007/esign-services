import { CacheModule, Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './modules/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/users/user.module'
import { RedisModule } from './modules/redis/redis.module'
import { KafkaModule } from './modules/kafka/kafka.module'
import { SignatureModule } from './modules/signature/signature.module'
import { DocumentModule } from './modules/documents/document.module'
import { IPFSModule } from './modules/ipfs/ipfs.module'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    RedisModule,
    KafkaModule,
    SignatureModule,
    DocumentModule,
    IPFSModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
