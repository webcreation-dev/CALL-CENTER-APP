"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryingModule = void 0;
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("./pagination.service");
const filtering_service_1 = require("./filtering.service");
let QueryingModule = class QueryingModule {
};
QueryingModule = __decorate([
    (0, common_1.Module)({
        providers: [pagination_service_1.PaginationService, filtering_service_1.FilteringService],
        exports: [pagination_service_1.PaginationService, filtering_service_1.FilteringService],
    })
], QueryingModule);
exports.QueryingModule = QueryingModule;
//# sourceMappingURL=querying.module.js.map