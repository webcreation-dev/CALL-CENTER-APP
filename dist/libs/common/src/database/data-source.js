"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
dotenvExpand.expand(dotenv.config());
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATASOURCE_URL,
    entities: [
        'dist/libs/common/src/models/*.entity.js',
        'dist/apps/messaging/src/models/*.entity.js',
    ],
    migrations: ['dist/libs/common/src/database/migrations/*.js'],
});
dataSource.initialize();
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map