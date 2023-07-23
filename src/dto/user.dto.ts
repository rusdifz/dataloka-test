import { IsNotEmpty, IsOptional, IsEmail } from "class-validator";

export class Register {
    
    @IsNotEmpty()
    username: string
    
    @IsOptional()
    fullname?: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: any

}

export class Login {
    
    @IsOptional()
    username?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsNotEmpty()
    password: any

}


