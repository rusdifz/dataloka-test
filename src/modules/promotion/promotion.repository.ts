import { Injectable } from "@nestjs/common";
import { InjectRepository} from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";

import { PromotionEntity } from "../../entities";

@Injectable()
export class PromotionRepository {
    constructor(
        @InjectRepository(PromotionEntity) private readonly promotion: Repository<PromotionEntity>
    ) {}

    public async GetPromotion(query:any){

        let where:any = { deleted: false }

        if(query.filter){
            where.tags = ILike(`%${query.filter}%`) 
        }

        return await this.promotion.find({
            select:{
                id_banner_promosi: true, 
                judul_promosi: true, 
                tanggal_awal: true, 
                tanggal_akhir: true, 
                banner: true, 
                isi: true, 
                url_target: true, 
                tags: true
            },
            where: where,
            take: query.limit, 
            skip: query.page
        })
    }

    public async GetPromotionDetail(query:any){
        return await this.promotion.findOne({
            select: {
                id_banner_promosi: true, 
                judul_promosi: true, 
                tanggal_awal: true, 
                tanggal_akhir: true, 
                banner: true, 
                isi: true, 
                url_target: true, 
                tags: true
            }, 
            where: {
                id_banner_promosi: query.id, 
                deleted: false
            }
        })
    }

    public async CheckData(query){
        return await this.promotion.findOne({
            where: query.where
        })
    }

    public async CountDataPromotion(){
        return await this.promotion.count()
    }

    public async CreatePromotion(payload: any){
        return await this.promotion.save(payload)
    }

    public async UpdatePromotion(payload: any){
        return await this.promotion
        .createQueryBuilder()
        .update("t_banner_promosi")
        .set({...payload})
        .where("id = :id", { id: payload.id_banner_promosi})
        .execute()
    }

    public async DeletePromotion(id: number){
        return await this.promotion
        .createQueryBuilder()
        .update("t_banner_promosi")
        .set({
            deleted: true
        })
        .where("id = :id", { id: id})
        .execute()
    }
    
}