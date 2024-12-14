"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./interceptor/transform.interceptor");
const transform_response_interceptor_1 = require("./interceptor/transform-response.interceptor");
const all_exception_filters_1 = require("./interceptor/all-exception.filters");
const helmet_1 = require("helmet");
const controller_module_1 = require("./controllers/controller.module");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const logger = new common_1.Logger('bootstrap');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
        app.useLogger(new common_1.Logger());
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            exceptionFactory: (errors) => {
                return new common_1.BadRequestException(errors);
            },
        }));
        app.useGlobalInterceptors(new transform_response_interceptor_1.ResponseTransformInterceptor());
        app.useGlobalFilters(new all_exception_filters_1.AllExceptionsFilter());
        app.useGlobalFilters(new all_exception_filters_1.ValidationExceptionFilter());
        app.useGlobalFilters(new all_exception_filters_1.NotFoundFilter());
        app.enableCors({
            origin: ['http://localhost:3000'],
            credentials: true,
        });
        app.use((0, helmet_1.default)({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                },
            },
        }));
        app.use(cookieParser());
        app.use((0, helmet_1.default)({
            crossOriginResourcePolicy: {
                policy: 'cross-origin',
            },
        }));
        const swaggerOptions = new swagger_1.DocumentBuilder()
            .setTitle('API Swagger')
            .addBearerAuth({
            type: 'http',
            scheme: 'Bearer',
            bearerFormat: 'Bearer',
            in: 'header',
            name: 'Authorization',
        })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions, {
            include: [controller_module_1.ApiModule],
        });
        swagger_1.SwaggerModule.setup('api', app, document);
        await app.listen(process.env.PORT || 3000);
    }
    catch (err) {
        logger.error(err);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map