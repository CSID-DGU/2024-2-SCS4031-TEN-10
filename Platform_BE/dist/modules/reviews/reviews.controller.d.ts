import { ReviewsService } from './reviews.service';
import { InsertReviewDto } from './dto/insert-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getList(festival_idx: number): Promise<any>;
    insert(req: any, insertReviewDto: InsertReviewDto): Promise<object>;
}
