import { CacheModule, Module, CACHE_MANAGER, Inject } from '@nestjs/common'
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('redis'),
    })
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {
  constructor(
    @Inject(CACHE_MANAGER) cacheManager, 
  ) {
    const client = cacheManager.store.getClient();

    client.on('error', (error) =>  {
        console.info('error redis from module: ', error);
    });

  }
}
