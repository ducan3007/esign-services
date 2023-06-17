import redis from 'ioredis'
import { config } from './config'

export const redisClient = new redis({
  host: config.get('REDIS_HOST'),
  port: config.get('REDIS_PORT')
})


