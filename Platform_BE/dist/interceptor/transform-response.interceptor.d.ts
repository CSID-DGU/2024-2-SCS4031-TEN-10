import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    data: T;
}
export declare class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
