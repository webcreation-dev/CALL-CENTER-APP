"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFileProperty = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiFileProperty = () => (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' });
exports.ApiFileProperty = ApiFileProperty;
//# sourceMappingURL=api-file-property.decorator.js.map