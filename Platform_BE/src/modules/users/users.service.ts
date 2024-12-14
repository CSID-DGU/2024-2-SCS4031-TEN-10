import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';
import { SignupUserDto } from './dto/signup-user.dto';
import { Users } from 'src/entities/users.entity';
import { SigninUserDto } from './dto/signin-user.dto';
import { DuplicateCheckDto } from './dto/duplicate-check.dto';
import { GetFilterUsersDto } from './dto/get-filter-users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayload } from 'src/jwt/jwt-refresh/jwt-refresh.payload';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  //* 유저 확인
  async checkUsers(filter: GetFilterUsersDto): Promise<Users[]> {
    return await this.usersRepository.checkUsers(filter);
  }

  //* 유저 중복 검사
  async duplicateCheck(filter?: DuplicateCheckDto): Promise<Users[]> {
    return await this.usersRepository.duplicateCheck(filter);
  }

  //* 회원가입
  async signUp(signupUserDto: SignupUserDto): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();

      const { user_email, user_password } = signupUserDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user_password, salt);

      // 유저 정보 저장
      const user = new Users({
        user_email,
        user_password: hashedPassword,
        salt,
      });
      const result = await this.usersRepository.save(user);

      // 토큰 반환
      const { user_idx } = result;
      const payload: JwtRefreshPayload = { user_idx };
      const accessToken = await this.generateAccessToken(payload);

      await queryRunner.commitTransaction();
      return accessToken;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  //* 로그인
  async signIn(signinUserDto: SigninUserDto, user: Users): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const { user_password } = signinUserDto;

      // 비밀번호 비교
      if (await bcrypt.compare(user_password, user.user_password)) {
        const payload: JwtRefreshPayload = {
          user_idx: user.user_idx,
        };

        // 리프레쉬 토큰 저장
        const refreshToken = await this.generateRefreshToken(user.user_idx);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.usersRepository.updateRefreshToken(
          user.user_idx,
          hashedRefreshToken,
          queryRunner.manager,
        );

        // 토큰 반환
        const accessToken = await this.generateAccessToken(payload);

        await queryRunner.commitTransaction();

        return { accessToken, refreshToken };
      } else {
        throw new UnauthorizedException('로그인에 실패하였습니다.');
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  //* 로그아웃
  async signOut(user_idx: number): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();

      await this.usersRepository.updateRefreshToken(
        user_idx,
        null,
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async decodeRefreshToken(refreshToken: string) {
    try {
      const decodedRefreshToken = (await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      })) as JwtRefreshPayload;

      const userIdx = decodedRefreshToken.user_idx;
      const user = await this.getUserIfRefreshTokenMatches(
        refreshToken,
        userIdx,
      );

      if (!user) {
        throw new UnauthorizedException('Invalid user');
      } else {
        return user;
      }
    } catch (err) {
      if (err == 'JsonWebTokenError: jwt malformed') return;
      else throw err;
    }
  }

  //* 액세스 토큰 재발급
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const user = await this.decodeRefreshToken(refreshToken);

      const payload: JwtRefreshPayload = {
        user_idx: user.user_idx,
      };
      return await this.generateAccessToken(payload);
    } catch (err) {
      if (err == 'JsonWebTokenError: jwt malformed') return;
      else throw err;
    }
  }

  // 리프레시 토큰 검증 후 유저 정보 반환
  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userIdx: number,
  ): Promise<Users> {
    const filter = new GetFilterUsersDto({ user_idx: userIdx });
    const user = (await this.usersRepository.checkUsers(filter))[0];

    // refresh_token 없을 시 null 반환
    if (!user.refresh_token) {
      return null;
    }

    // DB 내부의 refresh_token 값과 요청 body의 refresh_token 값 비교
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );

    // 유저 정보 반환
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  //* 액세스 토큰 생성
  async generateAccessToken(payload: JwtRefreshPayload): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (err: any) {
      throw err;
    }
  }

  //* 리프레시 토큰 생성
  async generateRefreshToken(user_idx: number): Promise<string> {
    try {
      const tokenTime = 60 * 60 * 24 * 14; // 14일

      const refreshToken = await this.jwtService.signAsync(
        { user_idx },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: tokenTime,
        },
      );

      return refreshToken;
    } catch (err: any) {
      throw err;
    }
  }
}
