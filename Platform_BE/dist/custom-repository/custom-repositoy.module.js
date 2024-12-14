"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTypeOrmModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const custom_repository_decorator_1 = require("./custom-repository.decorator");
class CustomTypeOrmModule {
    static forCustomRepository(repositories) {
        const providers = [];
        for (const repository of repositories) {
            const entity = Reflect.getMetadata(custom_repository_decorator_1.CUSTOM_REPOSITORY, repository);
            if (!entity) {
                continue;
            }
            providers.push({
                inject: [(0, typeorm_1.getDataSourceToken)()],
                provide: repository,
                useFactory: (dataSource) => {
                    const baseRepository = dataSource.getRepository(entity);
                    return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
                },
            });
        }
        return {
            exports: providers,
            module: CustomTypeOrmModule,
            providers,
        };
    }
}
exports.CustomTypeOrmModule = CustomTypeOrmModule;
//# sourceMappingURL=custom-repositoy.module.js.map