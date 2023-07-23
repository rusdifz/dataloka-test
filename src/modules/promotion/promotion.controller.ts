import { Controller, Get, Query, Param, UseInterceptors, UseGuards, Headers } from "@nestjs/common";
import { PromotionService } from './promotion.service';
import { ResponseDetail, ResponsePagination } from "../../middleware/interceptor/response/success";
import { HeaderGuard } from "../../middleware/guard/header.guard";

@Controller('promotions')
export class PromotionController {
    constructor(
        private readonly service: PromotionService
    ){}

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponsePagination)
    @Get("/")
    async GetPromotion(@Headers() headers: any, @Query() query: any){
        if(headers.user){
            query.user = headers.user
        }

        return await this.service.GetListPromotion(query)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseDetail)
    @Get("/:promotion_id")
    async GetPromotionDetail(@Headers() headers: any, @Param('promotion_id') promotion_id: number){
        console.log('this');
        
        let data:any = { id: promotion_id}

        if(headers.user){
            data.user = headers.user
        }

        return await this.service.GetListPromotionDetail(data)
    }
    
}
