"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ResponseTransformInterceptor = class ResponseTransformInterceptor {
    constructor() {
        this.logger = new common_1.Logger('ResponseTransformInterceptor', {
            timestamp: true,
        });
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((res) => {
            if (!res) {
                return {
                    result: true,
                };
            }
            const { data, pagination, result, ...rest } = res || {};
            if (res?.data instanceof Array) {
                return {
                    result: result ? result : true,
                    data: data.map((item) => {
                        return {
                            ...item,
                        };
                    }),
                    pagination,
                    ...rest,
                };
            }
            else if (res instanceof Array) {
                return {
                    result: result ? result : true,
                    data: res,
                };
            }
            else if (res?.data instanceof Object) {
                return {
                    result: result ? result : true,
                    data: data
                        ? {
                            ...data,
                            ...rest,
                        }
                        : {
                            ...rest,
                        },
                };
            }
            else if (!res?.data && result) {
                return { result };
            }
            else if (res?.data === null) {
                return {
                    result: false,
                    data: {},
                };
            }
            else {
                return {
                    result: res.result,
                    data: !res.data
                        ? {}
                        : res?.data instanceof Object
                            ? { ...res?.data }
                            : res?.data,
                };
            }
        }));
    }
};
exports.ResponseTransformInterceptor = ResponseTransformInterceptor;
exports.ResponseTransformInterceptor = ResponseTransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseTransformInterceptor);
//# sourceMappingURL=transform-response.interceptor.js.map