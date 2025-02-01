"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParseFilePipe = exports.createFileValidators = void 0;
const common_1 = require("@nestjs/common");
const bytes = require("bytes");
const mime_types_1 = require("mime-types");
const file_signature_validator_1 = require("./validators/file-signature.validator");
const createFileTypeRegex = (fileTypes) => {
    const mediaTypes = fileTypes.map((type) => (0, mime_types_1.lookup)(type));
    return new RegExp(mediaTypes.join('|'));
};
const createFileValidators = (maxSize, fileTypes) => {
    const fileTypeRegex = createFileTypeRegex(fileTypes);
    return [
        new common_1.MaxFileSizeValidator({ maxSize: bytes(maxSize) }),
        new common_1.FileTypeValidator({ fileType: fileTypeRegex }),
        new file_signature_validator_1.FileSignatureValidator(),
    ];
};
exports.createFileValidators = createFileValidators;
const createParseFilePipe = (maxSize, ...fileTypes) => new common_1.ParseFilePipe({
    validators: (0, exports.createFileValidators)(maxSize, fileTypes),
    errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
});
exports.createParseFilePipe = createParseFilePipe;
//# sourceMappingURL=file-validation.util.js.map