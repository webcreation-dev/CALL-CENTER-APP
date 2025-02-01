"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJwtFromRequest = void 0;
function extractJwtFromRequest(request) {
    if (request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer ')) {
        return request.headers.authorization.slice(7);
    }
    return null;
}
exports.extractJwtFromRequest = extractJwtFromRequest;
//# sourceMappingURL=extract-jwt-request.js.map