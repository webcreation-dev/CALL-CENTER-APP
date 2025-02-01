"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCurrency = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const IsCurrency = (validationOptions) => (0, common_1.applyDecorators)((0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, validationOptions), (0, class_validator_1.IsPositive)(validationOptions));
exports.IsCurrency = IsCurrency;
//# sourceMappingURL=is-currency.decorator.js.map