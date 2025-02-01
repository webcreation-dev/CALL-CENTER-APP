"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCardinal = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const IsCardinal = (validationOptions) => (0, common_1.applyDecorators)((0, class_validator_1.IsInt)(validationOptions), (0, class_validator_1.IsPositive)(validationOptions));
exports.IsCardinal = IsCardinal;
//# sourceMappingURL=is-cardinal.decorator.js.map