"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtLeastOneSpecialCharacter = void 0;
const class_validator_1 = require("class-validator");
const PASSWORD_REGEX = /.*[@$!%*?&].*/;
const IS_PASSWORD_KEY = 'atLeastOneSpecialCharacter';
const atLeastOneSpecialCharacter = (value) => {
    return (0, class_validator_1.matches)(value, PASSWORD_REGEX);
};
const AtLeastOneSpecialCharacter = (validationOptions) => (0, class_validator_1.ValidateBy)({
    name: IS_PASSWORD_KEY,
    validator: {
        validate: (value) => atLeastOneSpecialCharacter(value),
        defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must contain at least one lowercase letter', validationOptions),
    },
}, validationOptions);
exports.AtLeastOneSpecialCharacter = AtLeastOneSpecialCharacter;
//# sourceMappingURL=at-least-one-special-character.decorator.js.map