import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import {
  AUTH_SERVICE,
  DatabaseModule,
  FilesModule,
  HealthModule,
  LoggerModule,
  QueryingModule,
  UsualModule,
} from '@app/common';
import { Property } from './models/property.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PropertiesRepository } from './properties.repository';
import { GalleriesModule } from './galleries.module';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Property]),
    HealthModule,
    LoggerModule,
    UsualModule,
    FilesModule,
    QueryingModule,
    GalleriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        AUTH_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'apps/properties/upload',
      ), // Répertoire physique
      serveRoot: '/upload', // Chemin public pour accéder aux fichiers
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, PropertiesRepository],
})
export class PropertiesModule {}
