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
exports.PropertiesService = void 0;
const common_1 = require("../../../libs/common/src");
const common_2 = require("@nestjs/common");
const properties_repository_1 = require("./properties.repository");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const galleries_repository_1 = require("./galleries.repository");
const property_entity_1 = require("./models/property.entity");
const gallery_entity_1 = require("./models/gallery.entity");
let PropertiesService = class PropertiesService {
    constructor(propertiesRepository, galleriesRepository, storageService, paginationService, filteringService) {
        this.propertiesRepository = propertiesRepository;
        this.galleriesRepository = galleriesRepository;
        this.storageService = storageService;
        this.paginationService = paginationService;
        this.filteringService = filteringService;
    }
    async findAll(propertiesQueryDto) {
        const { page, name, price, sort, order } = propertiesQueryDto;
        const limit = propertiesQueryDto.limit ?? common_1.DefaultPageSize.PROPERTY;
        const offset = this.paginationService.calculateOffset(limit, page);
        const [data, count] = await this.propertiesRepository.findAndCount({
            description: name ? this.filteringService.contains(name) : undefined,
            rent_price: price ? this.filteringService.compare(price) : undefined,
        }, {
            relations: {
                galleries: true,
            },
            order: { [sort]: order },
            skip: offset,
            take: limit,
        });
        const meta = this.paginationService.createMeta(limit, page, count);
        return { data, meta };
    }
    async create(createPropertyDto, { id }) {
        const property = await this.propertiesRepository.create(new property_entity_1.Property({
            ...createPropertyDto,
            userId: id,
        }));
        return this.propertiesRepository.findOne({ id: property.id }, { galleries: true });
    }
    async findOne(id) {
        return this.propertiesRepository.findOne({ id }, { galleries: true });
    }
    async findMany(ids) {
        const results = await Promise.allSettled(ids.map((id) => this.findOne(id)));
        return results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value);
    }
    async update(id, updatePropertyDto) {
        return this.propertiesRepository.findOneAndUpdate({ id }, updatePropertyDto);
    }
    async remove(id) {
        await this.propertiesRepository.findOneAndDelete({ id });
        await this.deleteBaseDir(id);
    }
    async addImages(id, files) {
        const property = await this.findOne(id);
        const savedPaths = await this.uploadImages(property.id, files);
        for (const path of savedPaths) {
            const gallery = new gallery_entity_1.Gallery({
                url: path,
                property,
            });
            await this.galleriesRepository.create(gallery);
        }
        return this.findOne(id);
    }
    async deleteImages(id, filenames) {
        await this.findOne(id);
        const { BASE, IMAGES } = common_1.FilePath.Products;
        const deleteOperations = filenames.map(async (filename) => {
            const path = (0, path_1.join)(BASE, id.toString(), IMAGES, filename);
            console.log(path);
            await this.storageService.validatePath(path);
            await this.storageService.delete(path);
            await this.galleriesRepository.findOneAndDelete({ url: filename });
        });
        await Promise.all(deleteOperations);
    }
    async uploadImages(id, files) {
        const { BASE, IMAGES } = common_1.FilePath.Products;
        const path = (0, path_1.join)(BASE, id.toString(), IMAGES);
        if (await (0, fs_extra_1.pathExists)((0, path_1.join)(common_1.BASE_PATH, path))) {
            const incomingFilecount = files.length;
            const dirFilecount = await this.storageService.getDirFilecount(path);
            const totalFilecount = incomingFilecount + dirFilecount;
            this.storageService.validateFilecount(totalFilecount, common_1.MaxFileCount.PRODUCT_IMAGES);
        }
        await this.storageService.createDir(path);
        const savedPaths = await Promise.all(files.map(async (file) => {
            const filePath = await this.storageService.saveFile(path, file);
            return filePath;
        }));
        return savedPaths;
    }
    async deleteBaseDir(id) {
        const { BASE } = common_1.FilePath.Products;
        const path = (0, path_1.join)(BASE, id.toString());
        await this.storageService.delete(path);
    }
};
PropertiesService = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [properties_repository_1.PropertiesRepository,
        galleries_repository_1.GalleriesRepository,
        common_1.StorageService,
        common_1.PaginationService,
        common_1.FilteringService])
], PropertiesService);
exports.PropertiesService = PropertiesService;
//# sourceMappingURL=properties.service.js.map