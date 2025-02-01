"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtLeastOneLowercaseLetter = void 0;
const class_validator_1 = require("class-validator");
const PASSWORD_REGEX = /.*[a-z].*/;
const IS_PASSWORD_KEY = 'atLeastOneLowercaseLetter';
const atLeastOneLowercaseLetter = (value) => {
    return (0, class_validator_1.matches)(value, PASSWORD_REGEX);
};
const AtLeastOneLowercaseLetter = (validationOptions) => (0, class_validator_1.ValidateBy)({
    name: IS_PASSWORD_KEY,
    validator: {
        validate: (value) => atLeastOneLowercaseLetter(value),
        defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must contain at least one lowercase letter', validationOptions),
    },
}, validationOptions);
exports.AtLeastOneLowercaseLetter = AtLeastOneLowercaseLetter;
//# sourceMappingURL=at-least-one-lowercase-letter.decorator.js.map