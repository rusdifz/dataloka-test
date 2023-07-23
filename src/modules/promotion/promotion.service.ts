import { Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { RedisService } from '../../utils/redis/redis.service';

@Injectable()
export class PromotionService {
    constructor(
        private readonly promoRepo: PromotionRepository,
        private readonly redis: RedisService
    ){}

    public async GetListPromotion(query: any){

        let limit = query.limit ? query.limit : 10
        let offset = query.offest ? (query.page-1)*limit : 0
        let data:any = []
        let pagination:any = {}
        let count:any = 0

        const fromRedis = await this.redis.Get(`promotionlist-${query.filter}-${limit}-${offset}`)

        if(fromRedis){
            
            data = fromRedis.data
            pagination = fromRedis.pagination

        }else{
            
            const getPromotion = await this.promoRepo.GetPromotion({limit: limit, page: offset})

            if(getPromotion){
                count = await this.promoRepo.CountDataPromotion()

                //set redis
                const payload = {
                    data: getPromotion, 
                    pagination: {
                        total: count,
                        total_page: Math.ceil(count / limit),
                        page: Math.ceil((offset/limit)+1)
                    }
                }
                
                await this.redis.Save(`promotionlist-${query.filter}-${limit}-${offset}`, payload, { ttl: 2 * (900 * 2000) });

                data = payload.data
                pagination = payload.pagination
            }

        }

        return {
            data: data,
            pagination: pagination
        }

    }

    public async GetListPromotionDetail(query: any){
        
        const fromRedis = await this.redis.Get(`promotiondetail-${query.id}`)
        
        if(fromRedis){
           return fromRedis

        }
        
        const data = await this.promoRepo.GetPromotionDetail(query)

        if(data){
            //set redis
            await this.redis.Save(`promotiondetail-${query.id}`, data, { ttl: 2 * (900 * 2000) });
            return data
        }

        return {}

    }

}
