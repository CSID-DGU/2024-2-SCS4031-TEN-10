import { ApiProperty } from '@nestjs/swagger';

export class JwtRefreshPayload {
  @ApiProperty({
    description: '유저 인덱스',
  })
  user_idx: number;
}
