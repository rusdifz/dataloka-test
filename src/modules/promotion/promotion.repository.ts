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

        let where:any = {}

        if(query.filter){
            where = {
                tags: ILike(`%${query.filter}%`)
            }
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
                id_banner_promosi: query.id
            }
        })
    }

    public async CountDataPromotion(){
        return await this.promotion.count()
    }
    
}