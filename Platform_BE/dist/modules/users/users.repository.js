"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const typeorm_1 = require("typeorm");
const custom_repository_decorator_1 = require("../../custom-repository/custom-repository.decorator");
const users_entity_1 = require("../../entities/users.entity");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    async checkUsers(filter) {
        const { user_idx, user_email } = filter;
        const query = this.createQueryBuilder('users');
        if (user_idx || user_idx == 0) {
            query.andWhere('users.user_idx = :user_idx', {
                user_idx,
            });
        }
        if (user_email) {
            query.andWhere('users.user_email = :user_email', {
                user_email,
            });
        }
        return await query.getMany();
    }
    async duplicateCheck(filter) {
        const { user_email } = filter;
        const query = this.createQueryBuilder('users');
        if (user_email) {
            query.orWhere('users.user_email = :user_email', {
                user_email,
            });
        }
        return await query.getMany();
    }
    async getRefreshToken(user_idx) {
        const query = this.createQueryBuilder('users');
        query.where('users.user_idx = :user_idx', {
            user_idx,
        });
        query.select(['users.refresh_token']);
        const result = await query.getOne();
        return result.refresh_token;
    }
    async updateRefreshToken(user_idx, refresh_token, manager) {
        return await manager.update(users_entity_1.Users, { user_idx }, { refresh_token });
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, custom_repository_decorator_1.CustomRepository)(users_entity_1.Users)
], UsersRepository);
//# sourceMappingURL=users.repository.js.map