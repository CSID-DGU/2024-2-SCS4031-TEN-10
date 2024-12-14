import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DuplicateCheckDto {
  constructor(partial: Partial<DuplicateCheckDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: '아이디',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  user_id: string;

  @ApiProperty({
    description: '닉네임',
    type: 'string',
    maxLength: 100,
    required: false,
  })
  @IsString()
  @IsOptional()
  user_name: string;

  @ApiProperty({
    description: '이메일',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  user_email: string;
}
