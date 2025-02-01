import { Module } from '@nestjs/common';
import {
  DatabaseModule,
  PROPERTIES_SERVICE,
  User,
  UsualModule,
} from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersSubscriber } from './subscribers/users.subscriber';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([User]),
    UsualModule,
    ClientsModule.registerAsync([
      {
        name: PROPERTIES_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('PROPERTIES_HOST'),
            port: configService.get('PROPERTIES_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersSubscriber,
    UsersRepository,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
