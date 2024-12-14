/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './users.entity';

@Entity()
export class Reviews {
  constructor(partial: Partial<Reviews>) {
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
  review_idx: number;

  @Column({
    comment: '후기 내용',
    type: 'varchar',
    length: 400,
  })
  @ApiProperty({
    description: '후기 내용',
    type: 'string',
  })
  @IsString()
  review_content: string;

  @Column({
    comment: '축제 인덱스',
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({
    description: '축제 인덱스',
    type: 'number',
  })
  @IsNumber()
  festival_idx: number;

  @CreateDateColumn({
    comment: '생성일',
    type: 'timestamp',
  })
  @ApiProperty({
    description: '생성일',
  })
  @IsDate()
  create_date: Date;

  // [this]:Users = n:1
  @ManyToOne((_type: any) => Users, (users) => users.user_idx, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'user_idx',
    referencedColumnName: 'user_idx',
  })
  users: Users;
}
