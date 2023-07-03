import { Injectable, OnModuleInit, INestApplication, OnApplicationShutdown } from '@nestjs/common'
import redis from 'ioredis'
import { config } from '@esign-services/logger'

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
    console.log('RedisService initialized')
  }

  async get(key: string) {
    return await this.redisClient.get(key)
  }
}
