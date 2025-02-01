import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import {
  IdDto,
  JwtAuthGuard,
  CurrentUser,
  User,
} from '@app/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CloseConversationDto } from './dto/close-conversation.dto';
import { AnswerMessagesDto } from './dto/answer-messages.dto';
import { ReceiveMessagesDto } from './dto/receive-messages.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  // Create conversation
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createConversationDto: CreateConversationDto,
    @CurrentUser() user: User,
  ) {
    return this.conversationsService.create(createConversationDto);
  }

  // Get all conversations by user connected
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.conversationsService.findAll(user);
  }

  // Get one conversation
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversationsService.findOne(id);
  }

  // Close conversation
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  close(@Param('id', ParseIntPipe) id: number, @Body() closeConversationDto: CloseConversationDto, @CurrentUser() user: User,) {
    return this.conversationsService.close(id, closeConversationDto, user);
  }

  // Get messages by conversation
  @UseGuards(JwtAuthGuard)
  @Patch(':id/messages')
  findMessages(@Param('id', ParseIntPipe) id: number) {
    return this.conversationsService.findMessages(id);
  }

  // Answer messages
  @UseGuards(JwtAuthGuard)
  @Patch(':id/answer')
  answerMessages(@Param('id', ParseIntPipe) id: number, @Body() answerMessagesDto: AnswerMessagesDto) {
    return this.conversationsService.answerMessages(id, answerMessagesDto);
  }

  // Receive messages from user by any canal
  @UseGuards(JwtAuthGuard)
  @Patch(':id/receive')
  receiveMessages(@Param('id', ParseIntPipe) id: number, @Body() receiveMessagesDto: ReceiveMessagesDto) {
    return this.conversationsService.receiveMessages(id, receiveMessagesDto);
  }


  // @MessagePattern('get_conversations')
  // @UsePipes(new ValidationPipe())
  // async get_conversations(@Payload() data: { conversationIds: number[] }) {
  //   const conversations = await this.conversationsService.findMany(data.conversationIds);
  //   return conversations;
  // }

  // @MessagePattern('get_conversation')
  // @UsePipes(new ValidationPipe())
  // async get_conversation(@Payload() data: { conversationId: number }) {
  //   const conversation = await this.conversationsService.findOne(data.conversationId);
  //   return conversation;
  // }
}
