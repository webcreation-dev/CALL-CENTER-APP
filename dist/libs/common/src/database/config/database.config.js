"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => {
    const config = {
        type: 'postgres',
        url: process.env.DATASOURCE_URL,
        autoLoadEntities: true,
        synchronize: false,
    };
    return config;
});
//# sourceMappingURL=database.config.js.map