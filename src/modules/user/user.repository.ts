import { Injectable } from "@nestjs/common";
import { InjectRepository} from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";

import { UserEntity } from "../../entities";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>
    ) {}

    public async GetUser(query: any){

        let where:any = {}

        if(query.username){
            where = {
                username: query.username
            }
        }else{
            where = {
                email: query.email
            }
        }

        return await this.user.findOne({
            select: {
                id_user: true,
                username: true, 
                email: true,
                password: true,
                fullname: true, 
                created_at: true, 
                updated_at: true
            },
            where: where
        })
    }

    public async GetEmail(query: any){
        return await this.user.findOne({
            select: {
                email: true
            },
            where: {
                email: query.email
            }
        })
    }

    public async SaveUser(payload: any){
        return await this.user.save(payload)
    }
    
}