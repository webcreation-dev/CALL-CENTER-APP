import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            TCP_PORT: Joi.number().required(),
          }),
        }),
        LoggerModule,
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
