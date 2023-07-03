import { Injectable } from '@nestjs/common'
import { RedisService } from './modules/redis/redis.service'

@Injectable()
export class AppService {
  async getData() {
    return { message: 'Hello API' }
  }
}
