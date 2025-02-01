import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from './messages.repository';
import { Message } from './models/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])], 
  providers: [MessagesRepository], 
  exports: [MessagesRepository], 
})
export class MessagesModule {}
