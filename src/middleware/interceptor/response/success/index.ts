import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export interface Response<T> {
    data: T;
  }
  
  @Injectable()
  export class ResponseInput<T> implements NestInterceptor<T, Response<T>> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({
          meta: {
            code: 201,
            msg: 'success',
          },
          data: data,
          error: null,
        })),
      );
    }
  }

  export class ResponseDetail<T> implements NestInterceptor<T, Response<T>> {

    private setCode(data: any){     
      if(data === null || Object.keys(data).length === 0){
        return {
          code: 404, 
          msg: "Data Not Found"
        }
      }

      return {
        code: 200, 
        msg: "Success"
      }
    }

    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({
          meta: this.setCode(data),
          data: data,
          error: null,
        })),
      );
    }
  }

  export class ResponsePagination<T> implements NestInterceptor<T, Response<T>> {
    
    private getDataPage(data: any) {
    if (!!data) {
      return data.data;
    }
    return [];
    }
    
    private getPage(data: any) {
      if (!!data) {
        return data.pagination;
      }
      return {
        total: 0,
        total_page: 0,
        page: 0,
        next_id: 0
      };
    }

    private setCode(data: any){
      if(data.length === 0){ 
        return {
          code: 404, 
          msg: "Data Not Found"
        }
      }

      return {
        code: 200, 
        msg: "Success"
      }
    }
    
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({
          meta: this.setCode(data),
          data: this.getDataPage(data),
          pagination: this.getPage(data),
          error: null
        })),
      );
    }
  }
