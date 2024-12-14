import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class InsertReviewDto {
  constructor(partial: Partial<InsertReviewDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: '후기 내용',
    type: 'string',
  })
  @IsString()
  review_content: string;

  @ApiProperty({
    description: '축제 인덱스',
    type: 'number',
  })
  @IsNumber()
  festival_idx: number;
}
