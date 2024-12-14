import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from './controllers/controller.module';
import { Modules } from './modules/modules';

@Module({
  imports: [
    // .env 파일 사용
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      // envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),

    // MySql 연결
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        synchronize: config.get('NODE_ENV') !== 'prod' ? true : false,
        autoLoadEntities: true,
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        timezone: 'Z',
        logging: true,
        live: true,
        supportBigNumbers: true,
        bigNumberStrings: false,
        entities: ['src/entities/*.entity{.ts}'],
      }),
    }),

    forwardRef(() =>
      RouterModule.register([
        {
          path: '',
          module: ApiModule,
        },
      ]),
    ),

    // 모듈 임포트
    Modules,
  ],
})
export class AppModule {}
