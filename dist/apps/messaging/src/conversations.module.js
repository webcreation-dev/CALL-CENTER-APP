"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsModule = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../../libs/common/src");
const conversation_entity_1 = require("./models/conversation.entity");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const microservices_1 = require("@nestjs/microservices");
const messages_module_1 = require("./messages.module");
const conversations_controller_1 = require("./conversations.controller");
const conversations_service_1 = require("./conversations.service");
const conversations_repository_1 = require("./conversations.repository");
const messages_controller_1 = require("./messages.controller");
let ConversationsModule = class ConversationsModule {
};
ConversationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.DatabaseModule,
            common_2.DatabaseModule.forFeature([conversation_entity_1.Conversation]),
            common_2.HealthModule,
            common_2.LoggerModule,
            common_2.UsualModule,
            common_2.FilesModule,
            common_2.QueryingModule,
            messages_module_1.MessagesModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    HTTP_PORT: Joi.number().required(),
                    AUTH_PORT: Joi.number().required(),
                    AUTH_HOST: Joi.string().required(),
                }),
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
        controllers: [conversations_controller_1.ConversationsController, messages_controller_1.MessagesController],
        providers: [conversations_service_1.ConversationsService, conversations_repository_1.ConversationsRepository],
    })
], ConversationsModule);
exports.ConversationsModule = ConversationsModule;
//# sourceMappingURL=conversations.module.js.map