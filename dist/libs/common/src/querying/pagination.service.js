"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
const common_1 = require("@nestjs/common");
let PaginationService = class PaginationService {
    calculateOffset(limit, page) {
        return (page - 1) * limit;
    }
    createMeta(limit, page, count) {
        const totalPages = Math.ceil(count / limit);
        if (page > totalPages)
            return;
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        return {
            itemsPerPage: limit,
            totalItems: count,
            currentPage: page,
            totalPages,
            hasNextPage,
            hasPreviousPage,
        };
    }
};
PaginationService = __decorate([
    (0, common_1.Injectable)()
], PaginationService);
exports.PaginationService = PaginationService;
//# sourceMappingURL=pagination.service.js.map