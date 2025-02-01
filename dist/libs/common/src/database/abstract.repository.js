"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
const common_1 = require("@nestjs/common");
class AbstractRepository {
    constructor(itemsRepository, entityManager) {
        this.itemsRepository = itemsRepository;
        this.entityManager = entityManager;
    }
    async create(entity) {
        return this.entityManager.save(entity);
    }
    async findOne(where, relations) {
        const entity = await this.itemsRepository.findOne({ where, relations });
        if (!entity) {
            this.logger.warn('Document not found with where', where);
            throw new common_1.NotFoundException('Entity not found.');
        }
        return entity;
    }
    async findOneAndUpdate(where, partialEntity) {
        const updateResult = await this.itemsRepository.update(where, partialEntity);
        if (!updateResult.affected) {
            this.logger.warn('Entity not found with where', where);
            throw new common_1.NotFoundException('Entity not found.');
        }
        return this.findOne(where);
    }
    async find(where) {
        return this.itemsRepository.findBy(where);
    }
    async findOneAndDelete(where) {
        await this.itemsRepository.delete(where);
    }
    async save(entity) {
        return this.itemsRepository.save(entity);
    }
    async findAndCount(where, options = {}) {
        return this.itemsRepository.findAndCount({
            where,
            relations: options.relations,
            order: options.order,
            skip: options.skip,
            take: options.take,
        });
    }
    async findMany(where, options = {}) {
        return this.itemsRepository.find({
            where,
            relations: options.relations,
            order: options.order,
            skip: options.skip,
            take: options.take,
        });
    }
}
exports.AbstractRepository = AbstractRepository;
//# sourceMappingURL=abstract.repository.js.map