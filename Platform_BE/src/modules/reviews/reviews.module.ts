import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTypeOrmModule } from 'src/custom-repository/custom-repositoy.module';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsService } from './reviews.service';
import { Reviews } from 'src/entities/reviews.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reviews]),
    CustomTypeOrmModule.forCustomRepository([ReviewsRepository]),
  ],
  exports: [ReviewsService],
  providers: [ReviewsService],
})
export class ReviewsModule {}
