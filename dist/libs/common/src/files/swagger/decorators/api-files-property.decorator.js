"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFilesProperty = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiFilesProperty = () => (0, swagger_1.ApiProperty)({ type: 'array', items: { type: 'string', format: 'binary' } });
exports.ApiFilesProperty = ApiFilesProperty;
//# sourceMappingURL=api-files-property.decorator.js.map