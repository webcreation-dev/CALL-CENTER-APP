"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const common_1 = require("@nestjs/common");
exports.HttpError = {
    NOT_FOUND: {
        status: common_1.HttpStatus.NOT_FOUND,
        error: 'Not Found',
    },
    CONFLICT: {
        status: common_1.HttpStatus.CONFLICT,
        error: 'Conflict',
    },
    PAYLOAD_TOO_LARGE: {
        status: common_1.HttpStatus.PAYLOAD_TOO_LARGE,
        error: 'Payload Too Large',
    },
    UNSUPPORTED_MEDIA_TYPE: {
        status: common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        error: 'Unsupported Media Type',
    },
    BAD_REQUEST: {
        status: common_1.HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
    },
};
//# sourceMappingURL=http-error.util.js.map