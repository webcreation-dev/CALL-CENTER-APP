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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let OtpService = class OtpService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiUrl = this.configService.get('OTP_API_URL');
        this.apiId = this.configService.get('OTP_APP_ID');
        this.authHeader = `Bearer ${this.configService.get('OTP_AUTH_KEY')}`;
    }
    async sendOtp(sendTo) {
        try {
            const response = await this.httpService
                .post(`${this.apiUrl}/send`, { send_to: sendTo, app_id: this.apiId }, {
                headers: {
                    Authorization: this.authHeader,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .toPromise();
            return response.status;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data, error.response?.status);
        }
    }
    async verifyOtp(code, sendTo) {
        try {
            const response = await this.httpService
                .post(`${this.apiUrl}/verify`, { code, send_to: sendTo, app_id: this.apiId }, {
                headers: {
                    Authorization: this.authHeader,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .toPromise();
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data, error.response?.status);
        }
    }
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map