"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSignatureValidator = void 0;
const common_1 = require("@nestjs/common");
const magic_bytes_js_1 = require("magic-bytes.js");
class FileSignatureValidator extends common_1.FileValidator {
    constructor() {
        super({});
    }
    buildErrorMessage() {
        return 'Validation failed (file type does not match file signature)';
    }
    isValid(file) {
        const fileSignatures = (0, magic_bytes_js_1.default)(file.buffer).map((file) => file.mime);
        if (!fileSignatures.length)
            return false;
        const isMatch = fileSignatures.includes(file.mimetype);
        if (!isMatch)
            return false;
        return true;
    }
}
exports.FileSignatureValidator = FileSignatureValidator;
//# sourceMappingURL=file-signature.validator.js.map