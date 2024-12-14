"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = exports.NotFoundFilter = exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.BadRequestException
            ? exception.getStatus()
            : common_1.HttpStatus.UNPROCESSABLE_ENTITY;
        response.status(status).json({
            result: false,
            statusCode: status,
            message: exception?.response?.message instanceof Array
                ? exception.response.message.map((data) => data.constraints)
                : exception?.response?.message,
        });
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], ValidationExceptionFilter);
let NotFoundFilter = class NotFoundFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.NotFoundException
            ? exception.getStatus()
            : common_1.HttpStatus.UNPROCESSABLE_ENTITY;
        response.status(status).json({
            result: false,
            statusCode: status,
            message: exception?.response?.message instanceof Array
                ? exception.response.message.map((data) => data.constraints)
                : exception?.response?.message,
        });
    }
};
exports.NotFoundFilter = NotFoundFilter;
exports.NotFoundFilter = NotFoundFilter = __decorate([
    (0, common_1.Catch)(common_1.NotFoundException)
], NotFoundFilter);
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger('AllExceptionsFilter', { timestamp: true });
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const error = exception instanceof common_1.HttpException
            ? exception.message
            : exception instanceof typeorm_1.QueryFailedError
                ? 'Internal Server Error'
                : 'Internal Server Error';
        this.logger.error('exception', exception);
        response.status(status).json({
            result: false,
            statusCode: status,
            message: error,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exception.filters.js.map