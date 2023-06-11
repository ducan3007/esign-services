import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { SignUpDto } from './dtos/auth.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login() {
    return 'login'
  }

  @ApiOperation({ summary: 'Register' })
  @Post('signup')
  async sigup(@Body() body: SignUpDto) {
    return this.authService.sigup(body)
  }
}
