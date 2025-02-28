import { Module } from '@nestjs/common';
import {
  AUTH_SERVICE,
  DatabaseModule,
  HealthModule,
  LoggerModule,
  UsualModule,
} from '@app/common';
import { Conversation } from './models/conversation.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagesModule } from './messages.module';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { ConversationsRepository } from './conversations.repository';
import { MessagesRepository } from './messages.repository';
import { Message } from './models/message.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Conversation, Message]),
    HealthModule,
    LoggerModule,
    UsualModule,
    MessagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        AUTH_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
      }),
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
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsRepository, MessagesRepository],
})
export class ConversationsModule {}
