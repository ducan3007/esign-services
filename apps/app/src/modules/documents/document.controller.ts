import { Controller, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { $1KB } from '@esign-services/logger'
import { Multer, diskStorage } from 'multer'
import { logger } from '@esign-services/logger'
import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { DocumentService } from './document.service'
import { ExceptionBadRequest } from '../../exceptions/controlled_exception'

@ApiTags('Document Management')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload document' })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: $1KB * $1KB * 10 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match('pdf|jpg|jpeg|png')) {
          return cb(null, true)
        }
        if(file.size > $1KB * $1KB * 10) {
          return cb(new ExceptionBadRequest('File size exceeded'), false)
        }
        return cb(new ExceptionBadRequest('Unsupported file type'), false)
      },
    })
  )
  async uploadDocument(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true
      })
    )
    file: Express.Multer.File
  ) {
    return this.documentService.uploadFile(file)
  }
}
