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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
const insert_review_dto_1 = require("./dto/insert-review.dto");
const user_auth_guard_1 = require("../../jwt/user-auth/user-auth.guard");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async getList(festival_idx) {
        try {
            return await this.reviewsService.getList(festival_idx);
        }
        catch (err) {
            throw err;
        }
    }
    async insert(req, insertReviewDto) {
        try {
            const reviewResult = await this.reviewsService.insert(req.user, insertReviewDto);
            return { result: true, data: reviewResult };
        }
        catch (err) {
            throw err;
        }
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Get)(':festival_idx'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '후기 목록 조회' }),
    __param(0, (0, common_1.Param)('festival_idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getList", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '후기 등록' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, insert_review_dto_1.InsertReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "insert", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('후기'),
    (0, common_1.Controller)('reviews'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map