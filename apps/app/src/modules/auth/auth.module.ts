import { config } from '@esign-services/logger'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../users/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('JWT_SECRET'),
      signOptions: { expiresIn: `${config.get('JWT_EXPIRATION_TIME')}d` }
    })
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, PrismaService, UserService]
})
export class AuthModule {}
   