import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SignupUserDto {
  @ApiProperty({
    description: '이메일',
    example: 'user1234@test.com',
    type: 'string',
  })
  @IsString()
  user_email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'test1234!',
    required: false,
  })
  @IsString()
  @IsOptional()
  user_password: string;
}
