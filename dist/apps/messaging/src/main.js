"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const microservices_1 = require("@nestjs/microservices");
const conversations_module_1 = require("./conversations.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(conversations_module_1.ConversationsModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use(cookieParser());
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('HTTP_PORT'));
    app.connectMicroservice({
        trasport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: configService.get('TCP_PORT'),
        },
    });
    await app.startAllMicroservices();
    app.useLogger(app.get(nestjs_pino_1.Logger));
}
bootstrap();
//# sourceMappingURL=main.js.map