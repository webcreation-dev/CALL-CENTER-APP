"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlyRequiredCharacters = void 0;
const class_validator_1 = require("class-validator");
const PASSWORD_REGEX = /^[a-zA-Z\d@$!%*?&]+$/;
const IS_PASSWORD_KEY = 'onlyRequiredCharacters';
const onlyRequiredCharacters = (value) => {
    return (0, class_validator_1.matches)(value, PASSWORD_REGEX);
};
const OnlyRequiredCharacters = (validationOptions) => (0, class_validator_1.ValidateBy)({
    name: IS_PASSWORD_KEY,
    validator: {
        validate: (value) => onlyRequiredCharacters(value),
        defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must contain at least one lowercase letter', validationOptions),
    },
}, validationOptions);
exports.OnlyRequiredCharacters = OnlyRequiredCharacters;
//# sourceMappingURL=only-required-characters.decorator.js.map