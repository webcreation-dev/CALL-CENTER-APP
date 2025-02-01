"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseExceptionFilter = void 0;
const regex_util_1 = require("../../../usual/regex/regex.util");
const error_response_util_1 = require("../../../usual/util/error-response.util");
const http_error_util_1 = require("../../../usual/util/http-error.util");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
let DatabaseExceptionFilter = class DatabaseExceptionFilter extends core_1.BaseExceptionFilter {
    constructor() {
        super(...arguments);
        this.FIELD_NAME_REGEX = /Key \((\w+)\)=/;
        this.FIELD_VALUE_REGEX = /\)=\((.*?)\)/;
        this.DatabaseErrorCode = {
            ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION: '23503',
            UNIQUE_VIOLATION: '23505',
        };
        this.MessageSnippet = {
            ASSOCIATION_NOT_FOUND: 'is not present',
            NOT_NULL_VIOLATION: 'is still referenced',
        };
        this.Description = {
            ASSOCIATION_NOT_FOUND: 'Associated entity not found',
            NOT_NULL_VIOLATION: 'Cannot delete due to NOT NULL constraint',
            UNIQUE_VIOLATION: 'Unique constraint violation',
        };
    }
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        const { code, detail, table } = exception;
        const { httpError, description } = this.createErrorData(code, detail);
        if (!httpError) {
            return super.catch(exception, host);
        }
        const { status, error } = httpError;
        const { fieldName, fieldValue } = this.extractMessageData(detail);
        const meta = { fieldName, fieldValue, table };
        const errorResponse = error_response_util_1.ErrorResponseUtil.createErrorResponse(status, description, error, meta);
        response.status(status).json(errorResponse);
    }
    createErrorData(code, message) {
        let httpError;
        let description;
        switch (code) {
            case this.DatabaseErrorCode.ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION:
                if (message.includes(this.MessageSnippet.ASSOCIATION_NOT_FOUND)) {
                    httpError = http_error_util_1.HttpError.NOT_FOUND;
                    description = this.Description.ASSOCIATION_NOT_FOUND;
                }
                else if (message.includes(this.MessageSnippet.NOT_NULL_VIOLATION)) {
                    httpError = http_error_util_1.HttpError.CONFLICT;
                    description = this.Description.NOT_NULL_VIOLATION;
                }
                break;
            case this.DatabaseErrorCode.UNIQUE_VIOLATION:
                httpError = http_error_util_1.HttpError.CONFLICT;
                description = this.Description.UNIQUE_VIOLATION;
                break;
        }
        return { httpError, description };
    }
    extractMessageData(message) {
        const fieldName = (0, regex_util_1.extractFromText)(message, this.FIELD_NAME_REGEX);
        const fieldValue = (0, regex_util_1.extractFromText)(message, this.FIELD_VALUE_REGEX);
        return { fieldName, fieldValue };
    }
};
DatabaseExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], DatabaseExceptionFilter);
exports.DatabaseExceptionFilter = DatabaseExceptionFilter;
//# sourceMappingURL=database-exception.filter.js.map