import { Role, logger } from '@esign-services/logger'
import { CanActivate, ExecutionContext, Injectable, SetMetadata, mixin } from '@nestjs/common'

import { createParamDecorator } from '@nestjs/common'
import { UserService } from '../../users/user.service'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return req['user']
})

export const ValidateRequest = () => {
  @Injectable()
  class Guard implements CanActivate {
    constructor(private readonly userService: UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest()

      let user_permission

      const method = request.method
      const url = request.url
      const user = request.user
      const ip = request.ip

      logger.info(`Request: ${method} ${url} from ${ip} by ${user.email} `)

      // const user_cached = await redisClient.get(user.email)

      // if (!user_cached) {
      //   const user_detail = await this.userService.getUserByIdOrEmail(user.email)
      //   await redisClient.set(user.email, JSON.stringify(user_detail))
      // }

      return true
    }
  }
  return mixin(Guard)
}
