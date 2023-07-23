import * as redisStore from 'cache-manager-redis-store'
import { CacheStore } from '@nestjs/common'

 interface RedisConfig {
  redis: {
    store: CacheStore
    host: string
    port: number
    password: string
  }
}

export const redisConfig = (): RedisConfig => ({
  redis: {
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    password: process.env.REDIS_PASS,
  },
})
