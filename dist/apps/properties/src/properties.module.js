"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesModule = void 0;
const common_1 = require("@nestjs/common");
const properties_controller_1 = require("./properties.controller");
const properties_service_1 = require("./properties.service");
const common_2 = require("../../../libs/common/src");
const property_entity_1 = require("./models/property.entity");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const serve_static_1 = require("@nestjs/serve-static");
const properties_repository_1 = require("./properties.repository");
const galleries_module_1 = require("./galleries.module");
const path_1 = require("path");
const microservices_1 = require("@nestjs/microservices");
let PropertiesModule = class PropertiesModule {
};
PropertiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.DatabaseModule,
            common_2.DatabaseModule.forFeature([property_entity_1.Property]),
            common_2.HealthModule,
            common_2.LoggerModule,
            common_2.UsualModule,
            common_2.FilesModule,
            common_2.QueryingModule,
            galleries_module_1.GalleriesModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    HTTP_PORT: Joi.number().required(),
                    AUTH_PORT: Joi.number().required(),
                    AUTH_HOST: Joi.string().required(),
                }),
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', '..', '..', 'apps/properties/upload'),
                serveRoot: '/upload',
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: common_2.AUTH_SERVICE,
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('AUTH_HOST'),
                            port: configService.get('AUTH_PORT'),
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        controllers: [properties_controller_1.PropertiesController],
        providers: [properties_service_1.PropertiesService, properties_repository_1.PropertiesRepository],
    })
], PropertiesModule);
exports.PropertiesModule = PropertiesModule;
//# sourceMappingURL=properties.module.js.map