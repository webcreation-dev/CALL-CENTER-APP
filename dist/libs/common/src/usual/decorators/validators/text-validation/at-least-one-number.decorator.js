"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtLeastOneNumberLetter = void 0;
const class_validator_1 = require("class-validator");
const PASSWORD_REGEX = /.*[\d].*/;
const IS_PASSWORD_KEY = 'atLeastOneNumberLetter';
const atLeastOneNumberLetter = (value) => {
    return (0, class_validator_1.matches)(value, PASSWORD_REGEX);
};
const AtLeastOneNumberLetter = (validationOptions) => (0, class_validator_1.ValidateBy)({
    name: IS_PASSWORD_KEY,
    validator: {
        validate: (value) => atLeastOneNumberLetter(value),
        defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must contain at least one Number letter', validationOptions),
    },
}, validationOptions);
exports.AtLeastOneNumberLetter = AtLeastOneNumberLetter;
//# sourceMappingURL=at-least-one-number.decorator.js.map