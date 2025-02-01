import { Module } from '@nestjs/common';
import {
  DatabaseModule,
  PROPERTIES_SERVICE,
  Role,
  User,
  UsualModule,
} from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersSubscriber } from './subscribers/users.subscriber';
import { RolesRepository } from './roles.repository';
import { TempUserService } from './temps/temp-user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([User, Role]),
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
    TempUserService,
    UsersRepository,
    UsersSubscriber,
    UsersRepository,
    RolesRepository,
  ],
  exports: [UsersService, UsersRepository, TempUserService, RolesRepository],
})
export class UsersModule {}
