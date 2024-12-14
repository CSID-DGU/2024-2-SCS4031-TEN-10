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
exports.Reviews = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("./users.entity");
let Reviews = class Reviews {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Reviews = Reviews;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', {
        comment: '인덱스',
        unsigned: true,
        type: 'bigint',
    }),
    (0, swagger_1.ApiProperty)({
        description: '인덱스',
        type: 'number',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Reviews.prototype, "review_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '후기 내용',
        type: 'varchar',
        length: 400,
    }),
    (0, swagger_1.ApiProperty)({
        description: '후기 내용',
        type: 'string',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Reviews.prototype, "review_content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '축제 인덱스',
        unsigned: true,
        type: 'bigint',
    }),
    (0, swagger_1.ApiProperty)({
        description: '축제 인덱스',
        type: 'number',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Reviews.prototype, "festival_idx", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        comment: '생성일',
        type: 'timestamp',
    }),
    (0, swagger_1.ApiProperty)({
        description: '생성일',
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Reviews.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => users_entity_1.Users, (users) => users.user_idx, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'user_idx',
        referencedColumnName: 'user_idx',
    }),
    __metadata("design:type", users_entity_1.Users)
], Reviews.prototype, "users", void 0);
exports.Reviews = Reviews = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Reviews);
//# sourceMappingURL=reviews.entity.js.map