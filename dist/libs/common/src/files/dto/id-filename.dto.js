"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdFilenameDto = void 0;
const id_dto_1 = require("../../usual/dto/id.dto");
const filename_dto_1 = require("./filename.dto");
const swagger_1 = require("@nestjs/swagger");
class IdFilenameDto extends (0, swagger_1.IntersectionType)(id_dto_1.IdDto, filename_dto_1.FilenameDto) {
}
exports.IdFilenameDto = IdFilenameDto;
//# sourceMappingURL=id-filename.dto.js.map