import { config } from '@esign-services/logger'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy/jwt.strategy'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('JWT_SECRET'),
      signOptions: { expiresIn: `${config.get('JWT_EXPIRATION_TIME')}d` }
    })
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, PrismaService]
})
export class AuthModule {}
