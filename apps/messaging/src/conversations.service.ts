import {
  AUTH_SERVICE,
  MESSAGING_SERVICE,
  User,
} from '@app/common';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Conversation } from './models/conversation.entity';
import { ConversationsRepository } from './conversations.repository';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { StatusConversationEnum } from './enums/status_conversation.enum';
import { CloseConversationDto } from './dto/close-conversation.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { AnswerMessagesDto } from './dto/answer-messages.dto';
import { MessagesRepository } from './messages.repository';
import { Message } from './models/message.entity';
import { SenderTypeEnum } from './enums/sender_type.enum';


@Injectable()
export class ConversationsService {
  constructor(
    private readonly conversationsRepository: ConversationsRepository,
    private readonly messagesRepository: MessagesRepository,
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  async findAll({ id }: User) {
    return this.conversationsRepository.findOne(
      { user_id: id },
    );
  }

  async create(
    createConversationDto: CreateConversationDto,
  ) {


    const user = await firstValueFrom(
      this.authService.send('get_user', { id: createConversationDto.user_id }).pipe(
        catchError(() => {
          throw new NotFoundException('User not found.');
        }),
      ),
    );

    let conversation;
    try {
      conversation = await this.conversationsRepository.findOne({ phone_number: createConversationDto.phone_number, status: StatusConversationEnum.OPEN });
      return conversation;
    } catch (error) {
      
      return await this.conversationsRepository.create(
        new Conversation(createConversationDto),
      );
    }
  }

  async findOne(id: number) {
    return this.conversationsRepository.findOne({ id });
  }

  async findMessages(id: number) {
    return this.conversationsRepository.findOne({ id }, { messages: true });
  }

  async answerMessages(id: number, answerMessagesDto: AnswerMessagesDto) {

    const conversation = await this.findOne(id);

    const message = new Message({
      ...answerMessagesDto,
      sender_type: SenderTypeEnum.COMPANY,
      conversation
    });
    return this.messagesRepository.create(message);
  }

  async close(id: number, closeConversationDto: CloseConversationDto, user) {

    const conversation = await this.conversationsRepository.findOne({ id });
    if (conversation.user_id !== user.id) {
      throw new NotFoundException('You are not authorized to close this conversation');
    }

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
