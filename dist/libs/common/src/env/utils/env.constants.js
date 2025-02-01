"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_VALIDATION_SCHEMA = void 0;
const Joi = require("joi");
exports.ENV_VALIDATION_SCHEMA = Joi.object({
    DATASOURCE_USERNAME: Joi.required(),
    DATASOURCE_PASSWORD: Joi.required(),
    DATASOURCE_HOST: Joi.required(),
    DATASOURCE_PORT: Joi.number().required(),
    DATASOURCE_DATABASE: Joi.required(),
    DATASOURCE_URL: Joi.required(),
});
//# sourceMappingURL=env.constants.js.map