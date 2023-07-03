import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { logger } from '@esign-services/logger'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { config } from '@esign-services/logger'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET')
    })
  }

  validate(payload: unknown) {
    // logger.info(this.name.toString() + 'JWT Strategy validate %s' + JSON.stringify(payload))
    return payload
  }
}
