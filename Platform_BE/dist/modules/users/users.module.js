"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const custom_repositoy_module_1 = require("../../custom-repository/custom-repositoy.module");
const users_repository_1 = require("../users/users.repository");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const dotenv = require("dotenv");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("./users.service");
const users_entity_1 = require("../../entities/users.entity");
const jwt_refresh_strategy_1 = require("../../jwt/jwt-refresh/jwt-refresh.strategy");
dotenv.config();
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_ACCESS_SECRET,
                signOptions: {
                    expiresIn: 60 * 60 * 2,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users]),
            custom_repositoy_module_1.CustomTypeOrmModule.forCustomRepository([users_repository_1.UsersRepository]),
        ],
        exports: [users_service_1.UsersService],
        providers: [users_service_1.UsersService, jwt_1.JwtModule, jwt_refresh_strategy_1.JwtRefreshStrategy],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map