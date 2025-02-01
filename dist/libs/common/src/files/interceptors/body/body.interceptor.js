"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyInterceptor = void 0;
const common_1 = require("@nestjs/common");
let BodyInterceptor = class BodyInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        try {
            if (request.body.body) {
                const body = JSON.parse(request.body.body);
                request.body = body;
            }
            if (request.body.location && typeof request.body.location === 'string') {
                request.body.location = JSON.parse(request.body.location);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
        return next.handle();
    }
};
BodyInterceptor = __decorate([
    (0, common_1.Injectable)()
], BodyInterceptor);
exports.BodyInterceptor = BodyInterceptor;
//# sourceMappingURL=body.interceptor.js.map