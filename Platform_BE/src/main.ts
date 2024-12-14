import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ResponseTransformInterceptor } from './interceptor/transform-response.interceptor';
import {
  AllExceptionsFilter,
  NotFoundFilter,
  ValidationExceptionFilter,
} from './interceptor/all-exception.filters';
import helmet from 'helmet';
import { ApiModule } from './controllers/controller.module';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  try {
    const app = await NestFactory.create(AppModule);

    // JSON 직렬화
    app.useGlobalInterceptors(new TransformInterceptor());

    // 로그 추가
    app.useLogger(new Logger());

    // 요청 값 변환
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // DTO에 정의되지 않은 속성 무시
        forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성 있을 시 요청 무시
        transform: true, // 입력값을 DTO에 정의된 타입으로 변환
        transformOptions: {
          enableImplicitConversion: true, // 입력값을 DTO 타입으로 암묵적 변환
        },
        exceptionFactory: (errors) => {
          return new BadRequestException(errors);
        },
      }),
    );

    // 응답 값 변환
    app.useGlobalInterceptors(new ResponseTransformInterceptor());

    // 예외 필터
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalFilters(new ValidationExceptionFilter());
    app.useGlobalFilters(new NotFoundFilter());

    // CORS 허용
    app.enableCors({
      origin: ['http://localhost:3000'],
      credentials: true,
    });

    // CSP 설정
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"], // 현재 도메인의 리소스만 허용
            scriptSrc: ["'self'", "'unsafe-inline'"], // 현재 도메인 및 인라인 스크립트 사용 허용
            styleSrc: ["'self'", "'unsafe-inline'"], // 현재 도메인 및 인라인 스타일 시트 사용 허용
          },
        },
      }),
    );

    // 쿠키 파서
    app.use(cookieParser());

    app.use(
      helmet({
        crossOriginResourcePolicy: {
          policy: 'cross-origin',
        },
      }),
    );

    // 스웨거
    const swaggerOptions = new DocumentBuilder()
      .setTitle('API Swagger')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
        in: 'header',
        name: 'Authorization',
      })
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions, {
      include: [ApiModule],
    });
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
  } catch (err) {
    logger.error(err);
  }
}
bootstrap();
