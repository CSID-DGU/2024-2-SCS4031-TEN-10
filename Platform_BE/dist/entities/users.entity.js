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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let Users = class Users {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Users = Users;
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
], Users.prototype, "user_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '이메일',
        type: 'varchar',
        length: 255,
    }),
    (0, swagger_1.ApiProperty)({
        description: '이메일',
        type: 'string',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Users.prototype, "user_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '비밀번호',
        type: 'varchar',
    }),
    (0, swagger_1.ApiProperty)({
        description: '비밀번호',
        type: 'string',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Users.prototype, "user_password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '솔트',
        type: 'varchar',
    }),
    (0, swagger_1.ApiProperty)({
        description: '솔트',
        type: 'string',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Users.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '리프레시 토큰',
        type: 'varchar',
        nullable: true,
    }),
    (0, swagger_1.ApiProperty)({
        description: '리프레시 토큰',
        type: 'string',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Users.prototype, "refresh_token", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Users);
//# sourceMappingURL=users.entity.js.map