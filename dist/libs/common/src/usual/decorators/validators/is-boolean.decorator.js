"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBoolean = void 0;
const common_1 = require("@nestjs/common");
const to_boolean_decorator_1 = require("../transformers/to-boolean.decorator");
const class_validator_1 = require("class-validator");
const IsBoolean = (validationOptions) => (0, common_1.applyDecorators)((0, class_validator_1.IsBoolean)(validationOptions), (0, to_boolean_decorator_1.ToBoolean)());
exports.IsBoolean = IsBoolean;
//# sourceMappingURL=is-boolean.decorator.js.map