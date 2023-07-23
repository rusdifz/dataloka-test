import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class HeaderGuard implements CanActivate {
  constructor(){}
  async canActivate(context: ExecutionContext) {
    const request = await context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if(!authorization){
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      //cek auth
      const auth = await jwt.verify(authorization, process.env.JWT_KEY)
      request.headers["user"] = auth

      return true 
    
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
