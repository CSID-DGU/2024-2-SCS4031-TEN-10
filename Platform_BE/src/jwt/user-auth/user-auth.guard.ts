import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/public.decorator';

@Injectable()
export class UserAuthGuard extends AuthGuard('user') {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super();
  }

  // @Public() 데코레이터가 있을 시 인증받지 않음
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();

      const access_token = request.cookies['access_token'];
      if (!access_token || access_token == null) {
        throw new UnauthorizedException('Not Logged In');
      }
      const user = await this.jwtService.verify(access_token);

      request.user = user;
      return user;
    } catch (err) {
      if (err == 'TokenExpiredError: jwt expired') {
        throw new UnauthorizedException('Expired Access Token');
      } else {
        throw err;
      }
    }
  }
}
