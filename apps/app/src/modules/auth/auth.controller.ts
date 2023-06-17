import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginDto, SignUpDto } from './dtos/auth.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }

  @ApiOperation({ summary: 'Register' })
  @Post('signup')
  async sigup(@Body() body: SignUpDto) {
    return this.authService.sigup(body)
  }
}
