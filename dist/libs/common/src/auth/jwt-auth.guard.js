"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const services_1 = require("../constants/services");
const extract_jwt_request_1 = require("./extract-jwt-request");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard {
    constructor(authClient, reflector) {
        this.authClient = authClient;
        this.reflector = reflector;
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const jwt = (0, extract_jwt_request_1.extractJwtFromRequest)(request);
        console.log('jwt auth');
        console.log(jwt);
        if (!jwt) {
            return false;
        }
        return this.authClient
            .send('authenticate', {
            Authentication: jwt,
        })
            .pipe((0, rxjs_1.tap)((res) => {
            context.switchToHttp().getRequest().user = res;
        }), (0, rxjs_1.map)(() => true), (0, rxjs_1.catchError)((err) => {
            this.logger.error(err);
            return (0, rxjs_1.of)(false);
        }));
    }
};
JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(services_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map