import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetFilterUsersDto {
  constructor(partial: Partial<GetFilterUsersDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: '인덱스',
    type: 'number',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  user_idx: number;

  @ApiProperty({
    description: '이메일',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  user_email: string;
}
