import { NestFactory } from '@nestjs/core';
import { TestModule } from './test.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(TestModule);
    const configService = app.get(ConfigService);
    app.connectMicroservice({
      trasport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: configService.get('TCP_PORT'),
      }
    });
    // app.use(cookieParser());
    // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useLogger(app.get(Logger));
    await app.startAllMicroservices();
}
bootstrap();
