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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_repository_1 = require("./users.repository");
const users_entity_1 = require("../../entities/users.entity");
const get_filter_users_dto_1 = require("./dto/get-filter-users.dto");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService, configService, dataSource) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.dataSource = dataSource;
    }
    async checkUsers(filter) {
        return await this.usersRepository.checkUsers(filter);
    }
    async duplicateCheck(filter) {
        return await this.usersRepository.duplicateCheck(filter);
    }
    async signUp(signupUserDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { user_email, user_password } = signupUserDto;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(user_password, salt);
            const user = new users_entity_1.Users({
                user_email,
                user_password: hashedPassword,
                salt,
            });
            const result = await this.usersRepository.save(user);
            const { user_idx } = result;
            const payload = { user_idx };
            const accessToken = await this.generateAccessToken(payload);
            await queryRunner.commitTransaction();
            return accessToken;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async signIn(signinUserDto, user) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { user_password } = signinUserDto;
            if (await bcrypt.compare(user_password, user.user_password)) {
                const payload = {
                    user_idx: user.user_idx,
                };
                const refreshToken = await this.generateRefreshToken(user.user_idx);
                const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
                await this.usersRepository.updateRefreshToken(user.user_idx, hashedRefreshToken, queryRunner.manager);
                const accessToken = await this.generateAccessToken(payload);
                await queryRunner.commitTransaction();
                return { accessToken, refreshToken };
            }
            else {
                throw new common_1.UnauthorizedException('로그인에 실패하였습니다.');
            }
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async signOut(user_idx) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            await this.usersRepository.updateRefreshToken(user_idx, null, queryRunner.manager);
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
    async decodeRefreshToken(refreshToken) {
        try {
            const decodedRefreshToken = (await this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            }));
            const userIdx = decodedRefreshToken.user_idx;
            const user = await this.getUserIfRefreshTokenMatches(refreshToken, userIdx);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid user');
            }
            else {
                return user;
            }
        }
        catch (err) {
            if (err == 'JsonWebTokenError: jwt malformed')
                return;
            else
                throw err;
        }
    }
    async refreshAccessToken(refreshToken) {
        try {
            const user = await this.decodeRefreshToken(refreshToken);
            const payload = {
                user_idx: user.user_idx,
            };
            return await this.generateAccessToken(payload);
        }
        catch (err) {
            if (err == 'JsonWebTokenError: jwt malformed')
                return;
            else
                throw err;
        }
    }
    async getUserIfRefreshTokenMatches(refreshToken, userIdx) {
        const filter = new get_filter_users_dto_1.GetFilterUsersDto({ user_idx: userIdx });
        const user = (await this.usersRepository.checkUsers(filter))[0];
        if (!user.refresh_token) {
            return null;
        }
        const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refresh_token);
        if (isRefreshTokenMatching) {
            return user;
        }
    }
    async generateAccessToken(payload) {
        try {
            return await this.jwtService.signAsync(payload);
        }
        catch (err) {
            throw err;
        }
    }
    async generateRefreshToken(user_idx) {
        try {
            const tokenTime = 60 * 60 * 24 * 14;
            const refreshToken = await this.jwtService.signAsync({ user_idx }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: tokenTime,
            });
            return refreshToken;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_1.DataSource])
], UsersService);
//# sourceMappingURL=users.service.js.map