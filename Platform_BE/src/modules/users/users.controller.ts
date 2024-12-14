import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from 'src/public.decorator';
import { SignupUserDto } from './dto/signup-user.dto';
import { GetFilterUsersDto } from './dto/get-filter-users.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { GetEmailDuplicateCheckDto } from './dto/get-email-duplicate-check.dto';
import { DuplicateCheckDto } from './dto/duplicate-check.dto';
import { UserAuthGuard } from 'src/jwt/user-auth/user-auth.guard';
import { Response } from 'express';
import { JwtRefreshGuard } from 'src/jwt/jwt-refresh/jwt-refresh.guard';

@ApiTags('유저')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  @UseGuards(UserAuthGuard)
  @Public()
  @ApiOperation({ summary: '회원가입' })
  async signup(@Body() signupUserDto: SignupUserDto): Promise<object> {
    try {
      const { user_email } = signupUserDto;

      // 입력 정보 중복 검사
      const userFilter = new DuplicateCheckDto({
        user_email,
      });
      const userResult = await this.usersService.duplicateCheck(userFilter);
      if (userResult.length > 0) {
        throw new ConflictException('이미 가입된 계정입니다.');
      }

      // 회원가입
      await this.usersService.signUp(signupUserDto);
      return { result: true };
    } catch (err) {
      throw err;
    }
  }

  @Post('sign-in')
  @UseGuards(UserAuthGuard)
  @Public()
  @ApiOperation({ summary: '로그인' })
  async signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<object> {
    try {
      // 입력 정보 확인
      const userFilter = new GetFilterUsersDto({
        user_email: signinUserDto.user_email,
      });
      const user: any = await this.usersService.checkUsers(userFilter);
      if (user.length < 1) {
        throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
      }

      // 로그인
      const { accessToken, refreshToken } = await this.usersService.signIn(
        signinUserDto,
        user[0],
      );

      res.setHeader('Authorization', 'Bearer ' + accessToken);
      res.cookie('access_token', accessToken, {
        httpOnly: true,
      });
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
      });

      return { result: true };
    } catch (err) {
      throw err;
    }
  }

  @Post('sign-out')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: '로그아웃' })
  async signout(@Request() req, @Res() res): Promise<object> {
    try {
      const refreshToken = req.cookies['refresh_token'];
      const user = await this.usersService.decodeRefreshToken(refreshToken);

      await this.usersService.signOut(user.user_idx);
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');

      return res.json({ result: true });
    } catch (err) {
      throw err;
    }
  }

  @Post('duplicate/email')
  @UseGuards(UserAuthGuard)
  @Public()
  @ApiOperation({ summary: '이메일 중복 검사' })
  async emailDuplicateCheck(
    @Body() getEmailDuplicateCheckDto: GetEmailDuplicateCheckDto,
  ): Promise<any> {
    try {
      const { user_email } = getEmailDuplicateCheckDto;

      const data = await this.usersService.duplicateCheck(
        new DuplicateCheckDto({ user_email }),
      );

      if (data.length > 0) {
        throw new ConflictException('이미 사용 중인 이메일입니다.');
      } else {
        return { result: true, data: '사용 가능한 이메일입니다.' };
      }
    } catch (err) {
      throw err;
    }
  }

  @Post('refresh_token')
  @UseGuards(UserAuthGuard)
  @Public()
  @ApiOperation({ summary: '액세스 토큰 재요청' })
  async getList(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const refreshToken = req.cookies['refresh_token'];
      const accessToken =
        await this.usersService.refreshAccessToken(refreshToken);

      res.setHeader('Authorization', 'Bearer ' + accessToken);
      res.cookie('access_token', accessToken, {
        httpOnly: true,
      });

      if (accessToken) {
        return { result: true };
      } else {
        return { result: false };
      }
    } catch (err) {
      throw err;
    }
  }
}
