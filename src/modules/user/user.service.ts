import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';

import { UserRepository } from './user.repository';
import { Login, Register } from '../../dto/user.dto';
import { DbMock } from '../../utils/bulk-db/data.mock';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository
    ){}

    public async Login(data: Login){

        //cek username

        const user = await this.userRepo.GetUser(data)

        if(user){
            const isMatchPassword = await bcrypt.compare(data.password, user.password);

            if(isMatchPassword){
 
                let payload = {
                    id_user: user.id_user, 
                    username: user.username, 
                    email: user.email, 
                    fullname: user.fullname, 
                    created_at: user.created_at, 
                    updated_at: user.updated_at
                }

                const token = jwt.sign(payload, process.env.JWT_KEY)
    
                return token
            }

            throw new HttpException("Password incorrect", HttpStatus.BAD_REQUEST);
        }

        throw new HttpException("Username or Email not found", HttpStatus.BAD_REQUEST);

    }

    public async Register(data: Register){

        //cek username
        const checkUsername = await this.userRepo.GetUser(data)

        if(checkUsername){
            throw new HttpException("Username already exist", HttpStatus.BAD_REQUEST);
        }

        const checkEmail = await this.userRepo.GetEmail(data)

        if(checkEmail){
            throw new HttpException("Email already exist", HttpStatus.BAD_REQUEST);
        }

        //save data
        const saltOrRounds = 10;
        let payload:any = {
            username: data.username,
            email: data.email, 
            password: await bcrypt.hash(data.password, saltOrRounds),
            fullname: data.fullname
        }

        await this.userRepo.SaveUser(payload)    
        delete payload.password
        delete payload.deleted_at

        console.log('payload', payload);
        console.log('key jwt', process.env.JWT_KEY);
        
        const token = jwt.sign(payload, process.env.JWT_KEY)

        return {
            user: payload, 
            token: token
        }

    }

    public async BulkData(){

        const users = new DbMock().MockUser()

        const saltOrRounds = 10;
        for (const user of users) {
             
            let data = {
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                password: await bcrypt.hash(user.password, saltOrRounds)
            }

            await this.userRepo.SaveUser(data)  

        }

        return { data: users, pagination: [] }
    }
}
