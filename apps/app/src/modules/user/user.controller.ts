import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/guard/jwt.guard'
import { User, ValidateRequest } from '../auth/guard/validate_request.guard'
import { UserType } from '@esign-services/logger'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user detail' })
  @Get('/detail/:id_or_email')
  @UseGuards(JwtAuthGuard)
  async getUserDetail(@Param('id_or_email') id_email: string) {
    return this.userService.getUserByIdOrEmail(id_email)
  }

  @ApiOperation({ summary: 'Admin get All user' })
  @Get('/all')
  @UseGuards(ValidateRequest())
  @UseGuards(JwtAuthGuard)
  async getAllUser(@User() user: UserType) {
    return this.userService.adminGetAllUser()
  }
}
