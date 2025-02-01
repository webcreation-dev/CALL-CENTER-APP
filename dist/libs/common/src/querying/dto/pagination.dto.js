"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDto = void 0;
const is_cardinal_decorator_1 = require("../../usual/decorators/validators/is-cardinal.decorator");
const class_validator_1 = require("class-validator");
const querying_constants_1 = require("../util/querying.constants");
class PaginationDto {
    constructor() {
        this.page = 1;
    }
}
__decorate([
    (0, class_validator_1.Max)(querying_constants_1.MAX_PAGE_SIZE),
    (0, class_validator_1.IsOptional)(),
    (0, is_cardinal_decorator_1.IsCardinal)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.Max)(querying_constants_1.MAX_PAGE_NUMBER),
    (0, class_validator_1.IsOptional)(),
    (0, is_cardinal_decorator_1.IsCardinal)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=pagination.dto.js.map