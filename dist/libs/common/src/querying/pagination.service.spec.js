"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const pagination_service_1 = require("./pagination.service");
describe('PaginationService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [pagination_service_1.PaginationService],
        }).compile();
        service = module.get(pagination_service_1.PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=pagination.service.spec.js.map