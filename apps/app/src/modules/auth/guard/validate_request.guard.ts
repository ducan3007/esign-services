import { Role, logger } from '@esign-services/logger'
import { CanActivate, ExecutionContext, Injectable, SetMetadata, mixin } from '@nestjs/common'

import { createParamDecorator } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return req['user']
})

export const ValidateRequest = () => {
  class Guard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest()

      const method = request.method
      const url = request.url
      const user = request.user

      return true
    }
  }
  return mixin(Guard)
}
