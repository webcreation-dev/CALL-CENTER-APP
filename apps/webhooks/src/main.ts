import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { WebhooksModule } from './webhooks.module';

async function bootstrap() {
  const app = await NestFactory.create(WebhooksModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('HTTP_PORT'));
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
