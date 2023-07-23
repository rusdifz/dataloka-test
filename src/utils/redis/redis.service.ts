import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER)
        private cacheService: Cache,
      ) {}

    private async Connection(){
        const client = await this.cacheService.store.getClient();
        await client.on('error', (error) =>  {
            console.log('error redis',error)
        });

        return client.connected
    }

    public async Get(key: string) {
        const connection = await this.Connection()
        
        if(!connection){
            return null
        } 

        return JSON.parse(await this.cacheService.get<string>(key))
    }
    
    public async Save(key: string, data: any, ttl:any) {
        const connection = await this.Connection()
        
        if(!connection){
            return null
        }
        
        return await this.cacheService.set(key, JSON.stringify(data),ttl)
    }
    
    public async Delete(key: string) {
        const connection = await this.Connection()
        
        if(!connection){
            return null
        }
        
        return await this.cacheService.del<string>(key)
    }
}
