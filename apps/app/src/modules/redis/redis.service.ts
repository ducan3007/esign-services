import { config, logger } from '@esign-services/logger'
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import redis from 'ioredis'

@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  private readonly redisClient = new redis({
    host: config.get('REDIS_HOST'),
    port: config.get('REDIS_PORT'),
    username: config.get('REDIS_USERNAME'),
    password: config.get('REDIS_PASSWORD')
  })

  async onApplicationShutdown() {
    this.redisClient.disconnect()
  }

  async onModuleInit() {
    logger.info('Redis Service Initiated', {
      host: config.get('REDIS_HOST'),
      port: config.get('REDIS_PORT')
    })
  }

  async get(key: string) {
    return await this.redisClient.get(key)
  }
}
