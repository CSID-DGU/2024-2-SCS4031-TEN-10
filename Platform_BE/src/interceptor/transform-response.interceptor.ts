import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private logger = new Logger('ResponseTransformInterceptor', {
    timestamp: true,
  });

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res) => {
        if (!res) {
          return {
            result: true,
          };
        }

        const { data, pagination, result, ...rest } = res || {};

        // data가 배열일 시: 각 item을 변환하여 반환
        if (res?.data instanceof Array) {
          return {
            result: result ? result : true,
            data: data.map((item) => {
              return {
                ...item,
              };
            }),
            pagination,
            ...rest,
          };
        }
        // 응답 값이 배열일 시: 각 item을 변환하여 반환
        else if (res instanceof Array) {
          return {
            result: result ? result : true,
            data: res,
          };
        }
        // data가 객체일 시: 객체를 변환하여 반환
        else if (res?.data instanceof Object) {
          return {
            result: result ? result : true,
            data: data
              ? {
                  ...data,
                  ...rest,
                }
              : {
                  ...rest,
                },
          };
        }
        // data가 없고 result만 있을 시: result만 반환
        else if (!res?.data && result) {
          return { result };
        }
        // data가 null일 시: result = false, 빈 객체 반환
        else if (res?.data === null) {
          return {
            result: false,
            data: {},
          };
        }
        // 그 외: res를 변환하여 반환
        else {
          return {
            result: res.result,
            data: !res.data
              ? {}
              : res?.data instanceof Object
              ? { ...res?.data }
              : res?.data,
          };
        }
      }),
    );
  }
}
