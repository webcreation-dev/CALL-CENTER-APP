"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseUtil = void 0;
class ErrorResponseUtil {
    static createErrorResponse(statusCode, message, error, meta) {
        return {
            statusCode,
            message,
            error,
            meta,
        };
    }
}
exports.ErrorResponseUtil = ErrorResponseUtil;
//# sourceMappingURL=error-response.util.js.map