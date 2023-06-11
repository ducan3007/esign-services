import { ApiProperty } from '@nestjs/swagger'
import { user } from '@prisma/client'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignUpDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  confirmPassword: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  firstName: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  lastName: string
}

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string
}
