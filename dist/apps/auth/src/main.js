"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const cookieParser = require("cookie-parser");
const nestjs_pino_1 = require("nestjs-pino");
const auth_module_1 = require("./auth.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(auth_module_1.AuthModule);
    const configService = app.get(config_1.ConfigService);
    app.connectMicroservice({
        trasport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: configService.get('TCP_PORT'),
        },
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useLogger(app.get(nestjs_pino_1.Logger));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('The Conrod Shop')
        .setDescription('Documentation for the shop API')
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .setVersion('1.0')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.startAllMicroservices();
    await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map