"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOM_REPOSITORY = void 0;
exports.CustomRepository = CustomRepository;
const common_1 = require("@nestjs/common");
exports.CUSTOM_REPOSITORY = 'CUSTOM_REPOSITORY';
function CustomRepository(entity) {
    return (0, common_1.SetMetadata)(exports.CUSTOM_REPOSITORY, entity);
}
//# sourceMappingURL=custom-repository.decorator.js.map