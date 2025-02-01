"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsService = void 0;
const common_1 = require("../../../libs/common/src");
const common_2 = require("@nestjs/common");
const conversation_entity_1 = require("./models/conversation.entity");
const conversations_repository_1 = require("./conversations.repository");
const status_conversation_enum_1 = require("./enums/status_conversation.enum");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const messages_repository_1 = require("./messages.repository");
const message_entity_1 = require("./models/message.entity");
const sender_type_enum_1 = require("./enums/sender_type.enum");
let ConversationsService = class ConversationsService {
    constructor(conversationsRepository, messagesRepository, authService) {
        this.conversationsRepository = conversationsRepository;
        this.messagesRepository = messagesRepository;
        this.authService = authService;
    }
    async findAll({ id }) {
        return this.conversationsRepository.findMany({ user_id: id });
    }
    async create(createConversationDto) {
        await (0, rxjs_1.firstValueFrom)(this.authService.send('get_user', { id: createConversationDto.user_id }).pipe((0, rxjs_1.catchError)(() => {
            throw new common_2.NotFoundException('User not found.');
        })));
        let conversation;
        try {
            conversation = await this.conversationsRepository.findOne({ phone_number: createConversationDto.phone_number, status: status_conversation_enum_1.StatusConversationEnum.OPEN, canal: createConversationDto.canal });
            return conversation;
        }
        catch (error) {
            return await this.conversationsRepository.create(new conversation_entity_1.Conversation(createConversationDto));
        }
    }
    async findOne(id) {
        return this.conversationsRepository.findOne({ id });
    }
    async findMessages(id) {
        return this.conversationsRepository.findOne({ id }, { messages: true });
    }
    async answerMessages(id, answerMessagesDto) {
        const conversation = await this.findOne(id);
        const message = new message_entity_1.Message({
            ...answerMessagesDto,
            sender_type: sender_type_enum_1.SenderTypeEnum.COMPANY,
            conversation
        });
        return this.messagesRepository.create(message);
    }
    async receiveMessages(receiveMessagesDto) {
        const conversation = await this.create(receiveMessagesDto);
        const message = new message_entity_1.Message({
            ...receiveMessagesDto,
            sender_type: sender_type_enum_1.SenderTypeEnum.CLIENT,
            conversation
        });
        return this.messagesRepository.create(message);
    }
    async close(id, closeConversationDto, user) {
        const conversation = await this.findOne(id);
        if (conversation.status === status_conversation_enum_1.StatusConversationEnum.CLOSED) {
            throw new common_2.NotFoundException('Conversation already closed');
        }
        if (conversation.user_id !== user.id) {
            throw new common_2.NotFoundException('You are not authorized to close this conversation');
        }
        return this.conversationsRepository.findOneAndUpdate({ id }, {
            ...closeConversationDto,
            status: status_conversation_enum_1.StatusConversationEnum.CLOSED,
        });
    }
};
ConversationsService = __decorate([
    (0, common_2.Injectable)(),
    __param(2, (0, common_2.Inject)(common_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [conversations_repository_1.ConversationsRepository,
        messages_repository_1.MessagesRepository,
        microservices_1.ClientProxy])
], ConversationsService);
exports.ConversationsService = ConversationsService;
//# sourceMappingURL=conversations.service.js.map