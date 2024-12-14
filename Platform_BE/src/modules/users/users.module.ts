import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from 'src/custom-repository/custom-repositoy.module';
import { UsersRepository } from '../users/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from 'src/entities/users.entity';
import { JwtRefreshStrategy } from 'src/jwt/jwt-refresh/jwt-refresh.strategy';
dotenv.config();

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 2,
      },
    }),
    TypeOrmModule.forFeature([Users]),
    CustomTypeOrmModule.forCustomRepository([UsersRepository]),
  ],
  exports: [UsersService],
  providers: [UsersService, JwtModule, JwtRefreshStrategy],
})
export class UsersModule {}
