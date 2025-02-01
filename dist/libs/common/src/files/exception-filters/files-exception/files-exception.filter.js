"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesExceptionFilter = void 0;
const regex_util_1 = require("../../../usual/regex/regex.util");
const error_response_util_1 = require("../../../usual/util/error-response.util");
const http_error_util_1 = require("../../../usual/util/http-error.util");
const common_1 = require("@nestjs/common");
const bytes = require("bytes");
const mime_types_1 = require("mime-types");
let FilesExceptionFilter = class FilesExceptionFilter {
    constructor() {
        this.MAX_FILE_SIZE_REGEX = /less than (\d+)/;
        this.FILE_TYPES_REGEX = /\/(.*)\//;
        this.MessageSnippet = {
            MAX_SIZE: 'expected size',
            FILE_TYPE: 'expected type',
            FILE_SIGNATURE: 'does not match',
        };
        this.Description = {
            FILE_TYPE: 'Invalid file type',
            FILE_SIGNATURE: 'File type tampered',
        };
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const message = exception.getResponse();
        const errorResponse = error_response_util_1.ErrorResponseUtil.createErrorResponse(status, message, exception.name);
        response.status(status).json(errorResponse);
    }
    extractMaxSize(message) {
        const maxSizeStr = (0, regex_util_1.extractFromText)(message, this.MAX_FILE_SIZE_REGEX);
        const maxSizeInBytes = +maxSizeStr;
        const maxSize = bytes(maxSizeInBytes);
        return maxSize;
    }
    extractFileTypes(message) {
        const mediaTypesStr = (0, regex_util_1.extractFromText)(message, this.FILE_TYPES_REGEX);
        const mediaTypesWithBackslashes = mediaTypesStr.split('|');
        const mediaTypes = mediaTypesWithBackslashes.map((type) => type.replace('\\', ''));
        const fileTypes = mediaTypes.map((type) => (0, mime_types_1.extension)(type));
        return fileTypes;
    }
    createErrorData(message) {
        let httpError;
        let description;
        let maxSize;
        let expectedFileTypes;
        if (message.includes(this.MessageSnippet.MAX_SIZE)) {
            httpError = http_error_util_1.HttpError.PAYLOAD_TOO_LARGE;
            maxSize = this.extractMaxSize(message);
        }
        else if (message.includes(this.MessageSnippet.FILE_TYPE)) {
            httpError = http_error_util_1.HttpError.UNSUPPORTED_MEDIA_TYPE;
            description = this.Description.FILE_TYPE;
            expectedFileTypes = this.extractFileTypes(message);
        }
        else if (message.includes(this.MessageSnippet.FILE_SIGNATURE)) {
            httpError = http_error_util_1.HttpError.UNSUPPORTED_MEDIA_TYPE;
            description = this.Description.FILE_SIGNATURE;
        }
        else {
            httpError = http_error_util_1.HttpError.BAD_REQUEST;
        }
        return { httpError, description, maxSize, expectedFileTypes };
    }
};
FilesExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.UnprocessableEntityException)
], FilesExceptionFilter);
exports.FilesExceptionFilter = FilesExceptionFilter;
//# sourceMappingURL=files-exception.filter.js.map