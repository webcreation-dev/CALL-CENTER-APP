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
  IdDto,
  JwtAuthGuard,
  CurrentUser,
  User,
} from '@app/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CloseConversationDto } from './dto/close-conversation.dto';

@Controller('messages')
export class MessagesController {
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

  @Get()
  findAll(user: User,) {
    return this.conversationsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversationsService.findOne(id);
  }

  @Patch(':id')
  close(@Param() { id }: IdDto, @Body() closeConversationDto: CloseConversationDto) {
    return this.conversationsService.close(id, closeConversationDto);
  }
}
