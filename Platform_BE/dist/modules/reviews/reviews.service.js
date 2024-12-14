"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const reviews_entity_1 = require("../../entities/reviews.entity");
const reviews_repository_1 = require("./reviews.repository");
let ReviewsService = class ReviewsService {
    constructor(reviewsRepository, dataSource) {
        this.reviewsRepository = reviewsRepository;
        this.dataSource = dataSource;
    }
    async getList(festival_idx) {
        return await this.reviewsRepository.getList(festival_idx);
    }
    async insert(user, insertReviewDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        const { review_content, festival_idx } = insertReviewDto;
        const newReview = new reviews_entity_1.Reviews({
            review_content,
            festival_idx,
            users: user,
        });
        try {
            await queryRunner.startTransaction();
            await this.reviewsRepository.insertReview(newReview, queryRunner.manager);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reviews_repository_1.ReviewsRepository,
        typeorm_1.DataSource])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map