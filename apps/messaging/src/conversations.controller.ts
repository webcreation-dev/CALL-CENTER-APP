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

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createConversationDto: CreateConversationDto,
    @CurrentUser()
    user: User,
  ) {
    return this.conversationsService.create(createConversationDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(user: User,) {
    return this.conversationsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversationsService.findOne(id);
  }

  @Patch(':id')
  close(@Param('id', ParseIntPipe) id: number, @Body() closeConversationDto: CloseConversationDto) {
    return this.conversationsService.close(id, closeConversationDto);
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
