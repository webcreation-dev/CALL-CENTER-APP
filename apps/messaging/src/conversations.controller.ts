import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import {
  JwtAuthGuard,
  CurrentUser,
  User,
} from '@app/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CloseConversationDto } from './dto/close-conversation.dto';
import { AnswerMessagesDto } from './dto/answer-messages.dto';
import { ReceiveMessagesDto } from './dto/receive-messages.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidationPipe, UsePipes } from '@nestjs/common';

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
  @MessagePattern('receive_messages')
  @UsePipes(new ValidationPipe())
  receiveMessages(@Payload() data: { receiveMessagesDto: ReceiveMessagesDto }) {
    return this.conversationsService.receiveMessages(data.receiveMessagesDto);
  }
}
