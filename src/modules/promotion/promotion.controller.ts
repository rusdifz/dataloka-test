import { Controller, Get, Query, Param, UseInterceptors, UseGuards, Headers, Post, Put, Delete, Body } from "@nestjs/common";
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
    @Get("/detail/:promotion_id")
    async GetPromotionDetail(@Headers() headers: any, @Param('promotion_id') promotion_id: number){
        console.log('this');
        
        let data:any = { id: promotion_id}

        if(headers.user){
            data.user = headers.user
        }

        return await this.service.GetListPromotionDetail(data)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseDetail)
    @Post("/")
    async CreatePromotion(@Headers() headers: any, @Body() body: any){
        
        if(headers.user){
            body.created_by = headers.user.username
        }

        return await this.service.CreatePromotion(body)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseDetail)
    @Put("/:promotion_id")
    async UpdatePromotion(@Headers() headers: any, @Body() body: any, @Param('promotion_id') promotion_id: number){
        
        body.id_banner_promosi = promotion_id

        if(headers.user){
            body.updated_by = headers.user.username
        }

        return await this.service.UpdatePromotion(body)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseDetail)
    @Delete("/:promotion_id")
    async DeletePromotion(@Headers() headers: any, @Param('promotion_id') promotion_id: number){
        return await this.service.DeletePromotion(promotion_id)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponsePagination)
    @Get("/bulk-data")
    async BulkData(){
        return await this.service.BulkData()
    }
    
}
