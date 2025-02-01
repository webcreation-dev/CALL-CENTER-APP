"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const filtering_service_1 = require("./filtering.service");
describe('FilteringService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [filtering_service_1.FilteringService],
        }).compile();
        service = module.get(filtering_service_1.FilteringService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=filtering.service.spec.js.map