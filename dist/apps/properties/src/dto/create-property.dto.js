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
exports.CreatePropertyDto = void 0;
const class_validator_1 = require("class-validator");
const water_meter_type_enum_1 = require("../enums/water_meter_type.enum");
const paint_enum_1 = require("../enums/paint.enum");
const sanitary_enum_1 = require("../enums/sanitary.enum");
const electricity_meter_type_enum_1 = require("../enums/electricity_meter_type.enum");
const electricity_personal_meter_type_enum_1 = require("../enums/electricity_personal_meter_type.enum");
class CreatePropertyDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "number_rooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "number_living_rooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "rent_price", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "is_prepaid", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "month_advance", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "number_households", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "is_terace", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "is_fence", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "water_commission", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(paint_enum_1.PaintEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "paint", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(sanitary_enum_1.SanitaryEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "sanitary", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(water_meter_type_enum_1.WaterMeterTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "water_meter_type", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.water_meter_type === water_meter_type_enum_1.WaterMeterTypeEnum.FORAGE),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "water_drilling_rate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "electricity_commission", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(electricity_meter_type_enum_1.ElectricityMeterTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "electricity_meter_type", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.electricity_meter_type === electricity_meter_type_enum_1.ElectricityMeterTypeEnum.DECOUNTER),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "electricity_decounter_meter_rate", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.electricity_meter_type === electricity_meter_type_enum_1.ElectricityMeterTypeEnum.PERSONAL),
    (0, class_validator_1.IsEnum)(electricity_personal_meter_type_enum_1.ElectricityPersonalMeterTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "electricity_personal_meter_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "visit_price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "latitude", void 0);
exports.CreatePropertyDto = CreatePropertyDto;
//# sourceMappingURL=create-property.dto.js.map