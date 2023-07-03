import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Signature Management')
@Controller('signature')
export class SignatureController {}
