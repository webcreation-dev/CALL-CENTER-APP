"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const fse_service_1 = require("./fse.service");
describe('FseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [fse_service_1.FseService],
        }).compile();
        service = module.get(fse_service_1.FseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=fse.service.spec.js.map