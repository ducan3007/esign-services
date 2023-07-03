import { logger } from '@esign-services/logger'
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { Multer } from 'multer'
import { IPFSService } from '../ipfs/ipfs.service'

@Injectable()
export class DocumentService {
  constructor(private readonly ipfsService: IPFSService) {}

  async uploadFile(file: Express.Multer.File) {
    //save file locally
    console.log(file)
    const writeStream = createWriteStream(`./uploads/${randomUUID()}.${file.mimetype.split('/')[1]}`)
    writeStream.write(file.buffer)

    writeStream.on('finish' , () => {
      logger.info(`File ${file.originalname} uploaded successfully`)
    })

    // Upload file to IPFS
    const fileHash = await this.ipfsService.add(file)


    logger.info(`File ${file.originalname} uploaded successfully`)

    return {
      fileHash,
      fileName: file.originalname,
      fileSize: file.size
    }
  }
}
