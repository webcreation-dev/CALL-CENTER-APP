"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtLeastOneUppercaseLetter = void 0;
const class_validator_1 = require("class-validator");
const PASSWORD_REGEX = /.*[A-Z].*/;
const IS_PASSWORD_KEY = 'atLeastOneUppercaseLetter';
const atLeastOneUppercaseLetter = (value) => {
    return (0, class_validator_1.matches)(value, PASSWORD_REGEX);
};
const AtLeastOneUppercaseLetter = (validationOptions) => (0, class_validator_1.ValidateBy)({
    name: IS_PASSWORD_KEY,
    validator: {
        validate: (value) => atLeastOneUppercaseLetter(value),
        defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must contain at least one Uppercase letter', validationOptions),
    },
}, validationOptions);
exports.AtLeastOneUppercaseLetter = AtLeastOneUppercaseLetter;
//# sourceMappingURL=at-least-one-uppercase-letter.decorator.js.map