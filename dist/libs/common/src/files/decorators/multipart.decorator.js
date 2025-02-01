"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipartFormData = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const body_interceptor_1 = require("../interceptors/body/body.interceptor");
const file_constant_1 = require("../utils/file.constant");
function MultipartFormData(dto, maxFileCount = file_constant_1.MaxFileCount.PRODUCT_IMAGES) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)(file_constant_1.MULTIPART_FORMDATA_KEY), (0, swagger_1.ApiBody)({ type: dto }), (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', maxFileCount), body_interceptor_1.BodyInterceptor));
}
exports.MultipartFormData = MultipartFormData;
//# sourceMappingURL=multipart.decorator.js.map