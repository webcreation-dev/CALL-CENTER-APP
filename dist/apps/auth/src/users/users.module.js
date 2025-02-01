"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../../../libs/common/src");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const users_repository_1 = require("./users.repository");
const users_subscriber_1 = require("./subscribers/users.subscriber");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.DatabaseModule,
            common_2.DatabaseModule.forFeature([common_2.User]),
            common_2.UsualModule,
            microservices_1.ClientsModule.registerAsync([
                {
                    name: common_2.MESSAGING_SERVICE,
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('MESSAGING_HOST'),
                            port: configService.get('MESSAGING_PORT'),
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            users_repository_1.UsersRepository,
            users_subscriber_1.UsersSubscriber,
            users_repository_1.UsersRepository,
        ],
        exports: [users_service_1.UsersService, users_repository_1.UsersRepository],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map