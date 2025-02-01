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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const conversation_entity_1 = require("./models/conversation.entity");
const conversations_repository_1 = require("./conversations.repository");
const status_conversation_enum_1 = require("./enums/status_conversation.enum");
let ConversationsService = class ConversationsService {
    constructor(conversationsRepository) {
        this.conversationsRepository = conversationsRepository;
    }
    async findAll({ id }) {
        return this.conversationsRepository.findOne({ user_id: id });
    }
    async create(createConversationDto, { id }) {
        const conversation = await this.conversationsRepository.create(new conversation_entity_1.Conversation({
            ...createConversationDto,
            user_id: id,
        }));
        return conversation;
    }
    async findOne(id) {
        return this.conversationsRepository.findOne({ id });
    }
    async close(id, closeConversationDto) {
        return this.conversationsRepository.findOneAndUpdate({ id }, {
            ...closeConversationDto,
            status: status_conversation_enum_1.StatusConversationEnum.CLOSED,
        });
    }
};
ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [conversations_repository_1.ConversationsRepository])
], ConversationsService);
exports.ConversationsService = ConversationsService;
//# sourceMappingURL=conversations.service.js.map