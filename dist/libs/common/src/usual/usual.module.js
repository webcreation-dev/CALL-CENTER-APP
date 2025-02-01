"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsualModule = void 0;
const common_1 = require("@nestjs/common");
const hashing_service_1 = require("./hashing/hashing.service");
const bcrypt_service_1 = require("./hashing/bcrypt.service");
const core_1 = require("@nestjs/core");
const sucess_response_interceptor_1 = require("./interceptors/sucess-response.interceptor");
const not_found_exception_filter_1 = require("../database/exception-filters/not-found-exception/not-found-exception.filter");
const database_exception_filter_1 = require("../database/exception-filters/database-exception/database-exception.filter");
const http_exception_filter_1 = require("../database/exception-filters/http-exception/http-exception.filter");
const entity_metadata_exception_filter_1 = require("../database/exception-filters/entity-metadata-exception/entity-metadata-exception.filter");
let UsualModule = class UsualModule {
};
UsualModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            {
                provide: hashing_service_1.HashingService,
                useClass: bcrypt_service_1.BcryptService,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: sucess_response_interceptor_1.ResponseFormatInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: not_found_exception_filter_1.NotFoundExceptionFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: database_exception_filter_1.DatabaseExceptionFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: entity_metadata_exception_filter_1.EntityMetadataExceptionFilter,
            },
        ],
        exports: [hashing_service_1.HashingService],
    })
], UsualModule);
exports.UsualModule = UsualModule;
//# sourceMappingURL=usual.module.js.map