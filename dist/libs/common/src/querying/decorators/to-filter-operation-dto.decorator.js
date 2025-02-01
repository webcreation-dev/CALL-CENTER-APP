"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToFilterOperationDto = void 0;
const class_transformer_1 = require("class-transformer");
const filter_operation_dto_1 = require("../dto/filter-operation.dto");
const toFilterOperationDto = (value) => {
    const [operator, concOperands] = value.split(':');
    const operandsStr = concOperands ? concOperands.split(',') : [];
    const operands = operandsStr.map((operand) => +operand);
    const plainDto = { operator, operands };
    return (0, class_transformer_1.plainToInstance)(filter_operation_dto_1.FilterOperationDto, plainDto);
};
const ToFilterOperationDto = () => (0, class_transformer_1.Transform)(({ value }) => toFilterOperationDto(value));
exports.ToFilterOperationDto = ToFilterOperationDto;
//# sourceMappingURL=to-filter-operation-dto.decorator.js.map