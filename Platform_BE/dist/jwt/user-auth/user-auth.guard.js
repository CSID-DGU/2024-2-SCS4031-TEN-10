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
exports.UserAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const public_decorator_1 = require("../../public.decorator");
let UserAuthGuard = class UserAuthGuard extends (0, passport_1.AuthGuard)('user') {
    constructor(jwtService, reflector) {
        super();
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        try {
            const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
            if (isPublic) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const access_token = request.cookies['access_token'];
            if (!access_token || access_token == null) {
                throw new common_1.UnauthorizedException('Not Logged In');
            }
            const user = await this.jwtService.verify(access_token);
            request.user = user;
            return user;
        }
        catch (err) {
            if (err == 'TokenExpiredError: jwt expired') {
                throw new common_1.UnauthorizedException('Expired Access Token');
            }
            else {
                throw err;
            }
        }
    }
};
exports.UserAuthGuard = UserAuthGuard;
exports.UserAuthGuard = UserAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector])
], UserAuthGuard);
//# sourceMappingURL=user-auth.guard.js.map