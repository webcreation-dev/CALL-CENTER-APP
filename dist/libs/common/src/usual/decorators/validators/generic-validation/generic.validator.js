"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericValidatorConstraint = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../../database/data-source");
let GenericValidatorConstraint = class GenericValidatorConstraint {
    async validate(value, args) {
        const [entityClass, property, validationType] = args.constraints;
        const repository = data_source_1.default.getRepository(entityClass);
        const count = await repository.count({ where: { [property]: value } });
        if (validationType === 'exists') {
            return count > 0;
        }
        else if (validationType === 'unique') {
            return count === 0;
        }
        return false;
    }
    defaultMessage(args) {
        const [entityClass, property, validationType] = args.constraints;
        if (validationType === 'exists') {
            return `${property} does not exist in ${entityClass.name}`;
        }
        else if (validationType === 'unique') {
            return `${property} already exists in ${entityClass.name}`;
        }
        return `${property} validation failed in ${entityClass.name}`;
    }
};
GenericValidatorConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)()
], GenericValidatorConstraint);
exports.GenericValidatorConstraint = GenericValidatorConstraint;
//# sourceMappingURL=generic.validator.js.map