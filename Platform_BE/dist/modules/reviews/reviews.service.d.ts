import { DataSource } from 'typeorm';
import { InsertReviewDto } from './dto/insert-review.dto';
import { Reviews } from 'src/entities/reviews.entity';
import { ReviewsRepository } from './reviews.repository';
import { Users } from 'src/entities/users.entity';
export declare class ReviewsService {
    private readonly reviewsRepository;
    private readonly dataSource;
    constructor(reviewsRepository: ReviewsRepository, dataSource: DataSource);
    getList(festival_idx: number): Promise<Reviews[]>;
    insert(user: Users, insertReviewDto: InsertReviewDto): Promise<boolean>;
}
