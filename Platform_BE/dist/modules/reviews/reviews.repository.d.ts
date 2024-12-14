import { EntityManager, Repository } from 'typeorm';
import { Reviews } from 'src/entities/reviews.entity';
export declare class ReviewsRepository extends Repository<Reviews> {
    getList(festival_idx: number): Promise<Reviews[]>;
    insertReview(review: Reviews, manager: EntityManager): Promise<Reviews>;
}
