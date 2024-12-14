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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const public_decorator_1 = require("../../public.decorator");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const get_filter_users_dto_1 = require("./dto/get-filter-users.dto");
const signin_user_dto_1 = require("./dto/signin-user.dto");
const get_email_duplicate_check_dto_1 = require("./dto/get-email-duplicate-check.dto");
const duplicate_check_dto_1 = require("./dto/duplicate-check.dto");
const user_auth_guard_1 = require("../../jwt/user-auth/user-auth.guard");
const jwt_refresh_guard_1 = require("../../jwt/jwt-refresh/jwt-refresh.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signup(signupUserDto) {
        try {
            const { user_email } = signupUserDto;
            const userFilter = new duplicate_check_dto_1.DuplicateCheckDto({
                user_email,
            });
            const userResult = await this.usersService.duplicateCheck(userFilter);
            if (userResult.length > 0) {
                throw new common_1.ConflictException('이미 가입된 계정입니다.');
            }
            await this.usersService.signUp(signupUserDto);
            return { result: true };
        }
        catch (err) {
            throw err;
        }
    }
    async signin(signinUserDto, res) {
        try {
            const userFilter = new get_filter_users_dto_1.GetFilterUsersDto({
                user_email: signinUserDto.user_email,
            });
            const user = await this.usersService.checkUsers(userFilter);
            if (user.length < 1) {
                throw new common_1.NotFoundException('해당 사용자를 찾을 수 없습니다.');
            }
            const { accessToken, refreshToken } = await this.usersService.signIn(signinUserDto, user[0]);
            res.setHeader('Authorization', 'Bearer ' + accessToken);
            res.cookie('access_token', accessToken, {
                httpOnly: true,
            });
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
            });
            return { result: true };
        }
        catch (err) {
            throw err;
        }
    }
    async signout(req, res) {
        try {
            const refreshToken = req.cookies['refresh_token'];
            const user = await this.usersService.decodeRefreshToken(refreshToken);
            await this.usersService.signOut(user.user_idx);
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.json({ result: true });
        }
        catch (err) {
            throw err;
        }
    }
    async emailDuplicateCheck(getEmailDuplicateCheckDto) {
        try {
            const { user_email } = getEmailDuplicateCheckDto;
            const data = await this.usersService.duplicateCheck(new duplicate_check_dto_1.DuplicateCheckDto({ user_email }));
            if (data.length > 0) {
                throw new common_1.ConflictException('이미 사용 중인 이메일입니다.');
            }
            else {
                return { result: true, data: '사용 가능한 이메일입니다.' };
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getList(req, res) {
        try {
            const refreshToken = req.cookies['refresh_token'];
            const accessToken = await this.usersService.refreshAccessToken(refreshToken);
            res.setHeader('Authorization', 'Bearer ' + accessToken);
            res.cookie('access_token', accessToken, {
                httpOnly: true,
            });
            if (accessToken) {
                return { result: true };
            }
            else {
                return { result: false };
            }
        }
        catch (err) {
            throw err;
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.SignupUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_user_dto_1.SigninUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('sign-out'),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, swagger_1.ApiOperation)({ summary: '로그아웃' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signout", null);
__decorate([
    (0, common_1.Post)('duplicate/email'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '이메일 중복 검사' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_email_duplicate_check_dto_1.GetEmailDuplicateCheckDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "emailDuplicateCheck", null);
__decorate([
    (0, common_1.Post)('refresh_token'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '액세스 토큰 재요청' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getList", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('유저'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map