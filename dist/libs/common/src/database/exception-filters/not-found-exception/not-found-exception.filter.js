"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const error_response_util_1 = require("../../../usual/util/error-response.util");
const http_error_util_1 = require("../../../usual/util/http-error.util");
const regex_util_1 = require("../../../usual/regex/regex.util");
let NotFoundExceptionFilter = class NotFoundExceptionFilter {
    constructor() {
        this.ENTITY_NAME_REGEX = /type\s\"(\w+)\"/;
    }
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        const { status, error } = http_error_util_1.HttpError.NOT_FOUND;
        const { entityName } = this.extractMessageData(exception.message);
        const message = `${entityName} not found`;
        const errorResponse = error_response_util_1.ErrorResponseUtil.createErrorResponse(status, message, error);
        response.status(status).json(errorResponse);
    }
    extractMessageData(message) {
        const entityName = (0, regex_util_1.extractFromText)(message, this.ENTITY_NAME_REGEX);
        return { entityName };
    }
};
NotFoundExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.EntityNotFoundError)
], NotFoundExceptionFilter);
exports.NotFoundExceptionFilter = NotFoundExceptionFilter;
//# sourceMappingURL=not-found-exception.filter.js.map