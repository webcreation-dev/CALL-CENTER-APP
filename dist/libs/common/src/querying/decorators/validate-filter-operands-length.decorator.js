"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFilterOperandsLength = void 0;
const class_validator_1 = require("class-validator");
const VALIDATE_FILTER_OPERANDS_LENGTH_KEY = 'validateFilterOperandsLength';
const validateFilterOperandsLength = (args) => {
    const filterOperationDto = args.object;
    const { operator, operands } = filterOperationDto;
    switch (operator) {
        case 'lt':
        case 'lte':
        case 'gt':
        case 'gte':
        case 'eq':
            return operands.length === 1;
        case 'btw':
            return operands.length === 2;
        default:
            const exhaustiveCheck = operator;
            return exhaustiveCheck;
    }
};
const ValidateFilterOperandsLength = () => (0, class_validator_1.ValidateBy)({
    name: VALIDATE_FILTER_OPERANDS_LENGTH_KEY,
    validator: {
        validate: (value, args) => validateFilterOperandsLength(args),
        defaultMessage: () => 'Operands length is not according to filter operator',
    },
});
exports.ValidateFilterOperandsLength = ValidateFilterOperandsLength;
//# sourceMappingURL=validate-filter-operands-length.decorator.js.map