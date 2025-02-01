"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPassword = void 0;
const class_validator_1 = require("class-validator");
const at_least_one_lowercase_letter_decorator_1 = require("./text-validation/at-least-one-lowercase-letter.decorator");
const common_1 = require("@nestjs/common");
const at_least_one_number_decorator_1 = require("./text-validation/at-least-one-number.decorator");
const at_least_one_uppercase_letter_decorator_1 = require("./text-validation/at-least-one-uppercase-letter.decorator");
const at_least_one_special_character_decorator_1 = require("./text-validation/at-least-one-special-character.decorator");
const only_required_characters_decorator_1 = require("./text-validation/only-required-characters.decorator");
const IsPassword = (validationOptions) => (0, common_1.applyDecorators)((0, at_least_one_lowercase_letter_decorator_1.AtLeastOneLowercaseLetter)(validationOptions), (0, at_least_one_number_decorator_1.AtLeastOneNumberLetter)(validationOptions), (0, at_least_one_uppercase_letter_decorator_1.AtLeastOneUppercaseLetter)(validationOptions), (0, at_least_one_special_character_decorator_1.AtLeastOneSpecialCharacter)(validationOptions), (0, only_required_characters_decorator_1.OnlyRequiredCharacters)(validationOptions), (0, class_validator_1.Length)(8, 20, validationOptions));
exports.IsPassword = IsPassword;
//# sourceMappingURL=is-password.decorator.js.map