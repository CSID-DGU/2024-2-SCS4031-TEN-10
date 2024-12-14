"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRepository = void 0;
const typeorm_1 = require("typeorm");
const custom_repository_decorator_1 = require("../../custom-repository/custom-repository.decorator");
const reviews_entity_1 = require("../../entities/reviews.entity");
let ReviewsRepository = class ReviewsRepository extends typeorm_1.Repository {
    async getList(festival_idx) {
        const query = this.createQueryBuilder('reviews');
        if (festival_idx || festival_idx == 0) {
            query.andWhere('reviews.festival_idx = :festival_idx', {
                festival_idx,
            });
        }
        query.orderBy('reviews.create_date', 'DESC');
        return await query.getMany();
    }
    async insertReview(review, manager) {
        const result = await manager.save(reviews_entity_1.Reviews, review);
        return result;
    }
};
exports.ReviewsRepository = ReviewsRepository;
exports.ReviewsRepository = ReviewsRepository = __decorate([
    (0, custom_repository_decorator_1.CustomRepository)(reviews_entity_1.Reviews)
], ReviewsRepository);
//# sourceMappingURL=reviews.repository.js.map