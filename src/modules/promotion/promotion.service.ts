import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Not } from 'typeorm';

import { PromotionRepository } from './promotion.repository';
import { RedisService } from '../../utils/redis/redis.service';
import { CreatePromotion, UpdatePromotion } from "../../dto/promotion.dto";
import { DbMock } from '../../utils/bulk-db/data.mock';
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

    public async CreatePromotion(payload: CreatePromotion){

        await this.ValidateData(payload, "create")

        return await this.promoRepo.CreatePromotion(payload)

    }

    public async UpdatePromotion(payload: UpdatePromotion){
        
        await this.ValidateData(payload, "update")

        return await this.promoRepo.UpdatePromotion(payload)

    }

    public async DeletePromotion(id: number){
        return await this.promoRepo.DeletePromotion(id)
    }

    private async ValidateData(data: any, type: string){
        
        let where:any = {
            judul_promosi: data.judul_promosi
        }

        if(type == "update"){
            where.id_banner_promosi = Not(data.id_banner_promosi)
        }
        
        const checkJudul = await this.promoRepo.CheckData({ where: where }) 
            
        if(checkJudul){
            throw new HttpException("judul promosi sudah ada", HttpStatus.BAD_REQUEST);
        }

        return true
    }

    public async BulkData(){
        console.log('bulk');
        
        const data = new DbMock().MockBannerPromotion()

        // data.map(d =>{
        //     this.promoRepo.CreatePromotion(d)
        // })

        return { data: data, pagination: [] }
    }

}
