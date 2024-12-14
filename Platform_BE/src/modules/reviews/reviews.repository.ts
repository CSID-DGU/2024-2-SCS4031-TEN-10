import { EntityManager, Repository } from 'typeorm';
import { CustomRepository } from 'src/custom-repository/custom-repository.decorator';
import { Reviews } from 'src/entities/reviews.entity';

@CustomRepository(Reviews)
export class ReviewsRepository extends Repository<Reviews> {
  //* 후기 목록 조회
  async getList(festival_idx: number): Promise<Reviews[]> {
    const query = this.createQueryBuilder('reviews');

    if (festival_idx || festival_idx == 0) {
      query.andWhere('reviews.festival_idx = :festival_idx', {
        festival_idx,
      });
    }

    query.orderBy('reviews.create_date', 'DESC');
    return await query.getMany();
  }

  //* 알림 등록
  async insertReview(
    review: Reviews,
    manager: EntityManager,
  ): Promise<Reviews> {
    const result = await manager.save(Reviews, review);
    return result;
  }
}
