import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninUserDto {
  constructor(partial: Partial<SigninUserDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: '이메일',
    type: 'string',
    example: 'user1234@test.com',
  })
  @IsString()
  user_email: string;

  @ApiProperty({
    description: '비밀번호',
    type: 'string',
    example: 'test1234!',
  })
  @IsString()
  user_password: string;
}
