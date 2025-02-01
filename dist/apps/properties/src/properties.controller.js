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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesController = void 0;
const common_1 = require("@nestjs/common");
const properties_service_1 = require("./properties.service");
const create_property_dto_1 = require("./dto/create-property.dto");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("../../../libs/common/src");
const update_property_dto_1 = require("./dto/update-property.dto");
const filenames_dto_1 = require("../../../libs/common/src/files/dto/filenames.dto");
const microservices_1 = require("@nestjs/microservices");
const properties_query_dto_1 = require("./dto/querying/properties-query.dto");
let PropertiesController = class PropertiesController {
    constructor(propertiesService) {
        this.propertiesService = propertiesService;
    }
    create(createPropertyDto, user) {
        return this.propertiesService.create(createPropertyDto, user);
    }
    findAll(propertiesQueryDto) {
        return this.propertiesService.findAll(propertiesQueryDto);
    }
    findOne(id) {
        return this.propertiesService.findOne(id);
    }
    update({ id }, updatePropertyDto) {
        return this.propertiesService.update(id, updatePropertyDto);
    }
    async remove({ id }) {
        return this.propertiesService.remove(id);
    }
    addImages(id, files) {
        return this.propertiesService.addImages(id, files);
    }
    deleteImages(id, { filenames }) {
        return this.propertiesService.deleteImages(id, filenames);
    }
    async get_properties(data) {
        const properties = await this.propertiesService.findMany(data.propertyIds);
        return properties;
    }
    async get_property(data) {
        const property = await this.propertiesService.findOne(data.propertyId);
        return property;
    }
};
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto,
        common_2.User]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_query_dto_1.PropertiesQueryDto]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdDto, update_property_dto_1.UpdatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdDto]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', common_2.MaxFileCount.PRODUCT_IMAGES)),
    (0, common_1.Post)(':id/images'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFiles)((0, common_2.createParseFilePipe)('2MB', 'png', 'jpeg'))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "addImages", null);
__decorate([
    (0, common_1.Delete)(':id/images'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, filenames_dto_1.FilenamesDto]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "deleteImages", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_properties'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "get_properties", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_property'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "get_property", null);
PropertiesController = __decorate([
    (0, common_1.Controller)('properties'),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService])
], PropertiesController);
exports.PropertiesController = PropertiesController;
//# sourceMappingURL=properties.controller.js.map