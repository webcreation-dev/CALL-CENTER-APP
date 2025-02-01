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
exports.MessagesService = void 0;
const common_1 = require("../../../libs/common/src");
const common_2 = require("@nestjs/common");
const conversation_entity_1 = require("./models/conversation.entity");
const status_conversation_enum_1 = require("./enums/status_conversation.enum");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const messages_repository_1 = require("./messages.repository");
const conversations_service_1 = require("./conversations.service");
let MessagesService = class MessagesService {
    constructor(messagessRepository, conversationsService, messagingService) {
        this.messagessRepository = messagessRepository;
        this.conversationsService = conversationsService;
        this.messagingService = messagingService;
    }
    async findAll(listMessagesDto) {
        const messages = await this.messagessRepository.find({
            where: {
                conversation_id: listMessagesDto.conversation_id,
            },
            order: {
                created_at: 'DESC',
            },
        });
    }
    async create(createConversationDto) {
        await this.messagingService
            .send('get_user', {
            id: createConversationDto.user_id,
        })
            .pipe((0, rxjs_1.map)((res) => res), (0, rxjs_1.catchError)(() => (0, rxjs_1.throwError)(() => new common_2.NotFoundException('User not found.'))));
        const conversation = await this.conversationsRepository.create(new conversation_entity_1.Conversation(createConversationDto));
        return conversation;
    }
    async findOne(id) {
        return this.conversationsRepository.findOne({ id });
    }
    async close(id, closeConversationDto, user) {
        const conversation = await this.conversationsRepository.findOne({ id });
        if (conversation.user_id !== user.id) {
            throw new common_2.NotFoundException('You are not authorized to close this conversation');
        }
        return this.conversationsRepository.findOneAndUpdate({ id }, {
            ...closeConversationDto,
            status: status_conversation_enum_1.StatusConversationEnum.CLOSED,
        });
    }
};
MessagesService = __decorate([
    (0, common_2.Injectable)(),
    __param(2, (0, common_2.Inject)(common_1.MESSAGING_SERVICE)),
    __metadata("design:paramtypes", [messages_repository_1.MessagesRepository,
        conversations_service_1.ConversationsService,
        microservices_1.ClientProxy])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map