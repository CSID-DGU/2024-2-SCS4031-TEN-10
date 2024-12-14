import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment', {
    comment: '인덱스',
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({
    description: '인덱스',
    type: 'number',
  })
  @IsNumber()
  user_idx: number;

  @Column({
    comment: '이메일',
    type: 'varchar',
    length: 255,
  })
  @ApiProperty({
    description: '이메일',
    type: 'string',
  })
  @IsString()
  user_email: string;

  @Column({
    comment: '비밀번호',
    type: 'varchar',
  })
  @ApiProperty({
    description: '비밀번호',
    type: 'string',
  })
  @IsString()
  user_password: string;

  @Column({
    comment: '솔트',
    type: 'varchar',
  })
  @ApiProperty({
    description: '솔트',
    type: 'string',
  })
  @IsString()
  salt: string;

  @Column({
    comment: '리프레시 토큰',
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty({
    description: '리프레시 토큰',
    type: 'string',
  })
  @IsString()
  refresh_token: string;
}
