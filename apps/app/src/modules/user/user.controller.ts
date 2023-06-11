import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register' })
  @Get('/:user_id')
  async sigup(@Param('user_id') userId: string) {
    return this.userService.getUserById(userId)
  }
}
