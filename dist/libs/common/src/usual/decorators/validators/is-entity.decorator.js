"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEntity = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const id_dto_1 = require("../../dto/id.dto");
const IsEntity = () => (0, common_1.applyDecorators)((0, class_validator_1.IsDefined)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => id_dto_1.IdDto));
exports.IsEntity = IsEntity;
//# sourceMappingURL=is-entity.decorator.js.map