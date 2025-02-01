"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteringService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let FilteringService = class FilteringService {
    contains(text) {
        if (!text)
            return;
        return (0, typeorm_1.ILike)(`%${text}%`);
    }
    compare(filterOperationDto) {
        if (!filterOperationDto)
            return;
        const { operator, operands } = filterOperationDto;
        const [operand, secondOperand] = operands;
        switch (operator) {
            case 'lt':
                return (0, typeorm_1.LessThan)(operand);
            case 'lte':
                return (0, typeorm_1.LessThanOrEqual)(operand);
            case 'gt':
                return (0, typeorm_1.MoreThan)(operand);
            case 'gte':
                return (0, typeorm_1.MoreThanOrEqual)(operand);
            case 'eq':
                return (0, typeorm_1.Equal)(operand);
            case 'btw':
                return (0, typeorm_1.Between)(operand, secondOperand);
            default:
                const exhaustiveCheck = operator;
                return exhaustiveCheck;
        }
    }
};
FilteringService = __decorate([
    (0, common_1.Injectable)()
], FilteringService);
exports.FilteringService = FilteringService;
//# sourceMappingURL=filtering.service.js.map