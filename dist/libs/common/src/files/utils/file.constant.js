"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MULTIPART_FORMDATA_KEY = exports.FilePath = exports.BASE_PATH = exports.MaxFileCount = void 0;
const path_1 = require("path");
exports.MaxFileCount = {
    PRODUCT_IMAGES: 5,
    PROPERTY_IMAGES: 5,
};
const MICROSERVICE_NAME = process.env.MICROSERVICE_NAME || 'default-service';
exports.BASE_PATH = (0, path_1.join)(process.cwd(), 'apps', MICROSERVICE_NAME, 'upload');
exports.FilePath = {
    Products: {
        BASE: 'products',
        IMAGES: 'images',
    },
};
exports.MULTIPART_FORMDATA_KEY = 'multipart/form-data';
//# sourceMappingURL=file.constant.js.map