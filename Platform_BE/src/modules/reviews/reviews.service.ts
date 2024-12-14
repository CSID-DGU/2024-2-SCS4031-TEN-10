import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InsertReviewDto } from './dto/insert-review.dto';
import { Reviews } from 'src/entities/reviews.entity';
import { ReviewsRepository } from './reviews.repository';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly dataSource: DataSource,
  ) {}

  //* 후기 목록 조회
  async getList(festival_idx: number): Promise<Reviews[]> {
    return await this.reviewsRepository.getList(festival_idx);
  }

  //* 후기 등록
  async insert(
    user: Users,
    insertReviewDto: InsertReviewDto,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();

    const { review_content, festival_idx } = insertReviewDto;
    const newReview = new Reviews({
      review_content,
      festival_idx,
      users: user,
    });

    try {
      await queryRunner.startTransaction();

      await this.reviewsRepository.insertReview(newReview, queryRunner.manager);

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
