"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FseService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const file_constant_1 = require("../utils/file.constant");
let FseService = class FseService {
    async saveFile(path, file) {
        const { originalname, buffer } = file;
        const uniqueFilename = this.genUniqueFilename(originalname);
        const fullPath = (0, path_1.join)(file_constant_1.BASE_PATH, path, uniqueFilename);
        await (0, fs_extra_1.writeFile)(fullPath, buffer);
        return fullPath;
    }
    async saveFiles(dir, files) {
        await Promise.all(files.map(async (file) => {
            await this.saveFile(dir, file);
        }));
    }
    async createDir(path) {
        const fullPath = (0, path_1.join)(file_constant_1.BASE_PATH, path);
        await (0, fs_extra_1.mkdirp)(fullPath);
    }
    getFile(path) {
        const fullPath = (0, path_1.join)(file_constant_1.BASE_PATH, path);
        const stream = (0, fs_extra_1.createReadStream)(fullPath);
        return new common_1.StreamableFile(stream);
    }
    getDirFilenames(path) {
        const fullPath = (0, path_1.join)(file_constant_1.BASE_PATH, path);
        return (0, fs_extra_1.readdir)(fullPath);
    }
    async getDirFilecount(path) {
        const dirFilenames = await this.getDirFilenames(path);
        return dirFilenames.length;
    }
    async delete(path) {
        const fullPath = (0, path_1.join)(file_constant_1.BASE_PATH, path);
        await (0, fs_extra_1.remove)(fullPath);
    }
    async validatePath(path) {
        const fullPath = (0, path_1.join)(file_constant_1.BASE_PATH, path);
        if (!(await (0, fs_extra_1.pathExists)(fullPath))) {
            throw new common_1.NotFoundException('Path not found');
        }
    }
    validateFilecount(count, max) {
        if (count > max) {
            throw new common_1.ConflictException('File count exceeds max limit');
        }
    }
    genUniqueFilename(filename) {
        const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        return `${uniquePrefix}-${filename}`;
    }
};
FseService = __decorate([
    (0, common_1.Injectable)()
], FseService);
exports.FseService = FseService;
//# sourceMappingURL=fse.service.js.map