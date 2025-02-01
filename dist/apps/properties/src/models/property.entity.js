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
exports.Property = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../../../libs/common/src");
const gallery_entity_1 = require("./gallery.entity");
const water_meter_type_enum_1 = require("../enums/water_meter_type.enum");
const paint_enum_1 = require("../enums/paint.enum");
const sanitary_enum_1 = require("../enums/sanitary.enum");
const electricity_meter_type_enum_1 = require("../enums/electricity_meter_type.enum");
const electricity_personal_meter_type_enum_1 = require("../enums/electricity_personal_meter_type.enum");
let Property = class Property extends common_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "number_rooms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "number_living_rooms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "rent_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Property.prototype, "is_prepaid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "month_advance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "number_households", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Property.prototype, "is_terace", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Property.prototype, "is_fence", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "visit_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "water_commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Property.prototype, "water_drilling_rate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "electricity_commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Property.prototype, "electricity_decounter_meter_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Property.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", String)
], Property.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", String)
], Property.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: water_meter_type_enum_1.WaterMeterTypeEnum,
        enumName: 'water_meter_type_enum',
    }),
    __metadata("design:type", String)
], Property.prototype, "water_meter_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: paint_enum_1.PaintEnum,
        enumName: 'paint_enum',
    }),
    __metadata("design:type", String)
], Property.prototype, "paint", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: sanitary_enum_1.SanitaryEnum,
        enumName: 'sanitary_enum',
    }),
    __metadata("design:type", String)
], Property.prototype, "sanitary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: electricity_meter_type_enum_1.ElectricityMeterTypeEnum,
        enumName: 'electricity_meter_type_enum',
    }),
    __metadata("design:type", String)
], Property.prototype, "electricity_meter_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: electricity_personal_meter_type_enum_1.ElectricityPersonalMeterTypeEnum,
        enumName: 'electricity_personal_meter_type_enum',
        nullable: true,
    }),
    __metadata("design:type", String)
], Property.prototype, "electricity_personal_meter_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => gallery_entity_1.Gallery, (gallery) => gallery.property, { cascade: true }),
    __metadata("design:type", Array)
], Property.prototype, "galleries", void 0);
Property = __decorate([
    (0, typeorm_1.Entity)()
], Property);
exports.Property = Property;
//# sourceMappingURL=property.entity.js.map