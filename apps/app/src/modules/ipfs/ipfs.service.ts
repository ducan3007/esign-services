import { Injectable, OnModuleInit } from '@nestjs/common'
import * as ipfs from 'ipfs-http-client'
import { config, logger } from '@esign-services/logger'

@Injectable()
export class IPFSService implements OnModuleInit {
  private ipfsClient: any

  async onModuleInit() {
    logger.info('IPFS Service Initiated',{
      host: config.get('IPFS_HOST'),
      port: config.get('IPFS_PORT'),
      protocol: config.get('IPFS_PROTOCOL')
    })
    this.ipfsClient = ipfs.create({
      host: config.get('IPFS_HOST'),
      port: config.get('IPFS_PORT'),
      protocol: config.get('IPFS_PROTOCOL')
    })
  }

  async add(file: any) {
    const fileHash = await this.ipfsClient.add(file.buffer)
    return fileHash
  }
}
