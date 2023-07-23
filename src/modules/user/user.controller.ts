import { Controller, Post, UseInterceptors, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { ResponseDetail, ResponseInput } from "../../middleware/interceptor/response/success";
import { Register, Login } from '../../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService
    ){}

    @UseInterceptors(ResponseDetail)
    @Post("/login")
    async Login(@Body() body: Login){
        return await this.service.Login(body)
    }

    @UseInterceptors(ResponseInput)
    @Post("/register")
    async Register(@Body() body: Register){
        return await this.service.Register(body)
    }
}
