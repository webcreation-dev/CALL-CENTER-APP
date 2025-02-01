import {
  User,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { Conversation } from './models/conversation.entity';
import { ConversationsRepository } from './conversations.repository';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { StatusConversationEnum } from './enums/status_conversation.enum';
import { CloseConversationDto } from './dto/close-conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly conversationsRepository: ConversationsRepository,
  ) {}

  async findAll({ id }: User) {
    return this.conversationsRepository.findOne(
      { user_id: id },
    );
  }

  async create(
    createConversationDto: CreateConversationDto,
    { id }: User,
  ) {
    const conversation = await this.conversationsRepository.create(
      new Conversation({
        ...createConversationDto,
        user_id: id,
      }),
    );
    return conversation;
  }

  async findOne(id: number) {
    return this.conversationsRepository.findOne({ id });
  }

  async close(id: number, closeConversationDto: CloseConversationDto) {
    return this.conversationsRepository.findOneAndUpdate(
      { id },
      {
        ...closeConversationDto,
        status: StatusConversationEnum.CLOSED,
      }
      ,
    );
  }

}
