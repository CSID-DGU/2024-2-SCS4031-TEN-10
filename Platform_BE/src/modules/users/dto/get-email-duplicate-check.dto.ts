import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetEmailDuplicateCheckDto {
  constructor(partial: Partial<GetEmailDuplicateCheckDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: '이메일',
    type: 'string',
    example: 'user1234@test.com',
  })
  @IsString()
  user_email: string;
}
