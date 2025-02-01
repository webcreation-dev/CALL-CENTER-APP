"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesQueryDto = void 0;
const common_1 = require("../../../../../libs/common/src");
const properties_filter_dto_1 = require("./properties-filter.dto");
const properties_sort_dto_1 = require("./properties-sort.dto");
const swagger_1 = require("@nestjs/swagger");
class PropertiesQueryDto extends (0, swagger_1.IntersectionType)(common_1.PaginationDto, properties_filter_dto_1.PropertiesFilterDto, properties_sort_dto_1.PropertiesSortDto) {
}
exports.PropertiesQueryDto = PropertiesQueryDto;
//# sourceMappingURL=properties-query.dto.js.map