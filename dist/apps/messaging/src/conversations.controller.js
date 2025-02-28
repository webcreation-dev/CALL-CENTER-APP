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
exports.ConversationsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const conversations_service_1 = require("./conversations.service");
const common_2 = require("../../../libs/common/src");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const close_conversation_dto_1 = require("./dto/close-conversation.dto");
const answer_messages_dto_1 = require("./dto/answer-messages.dto");
const microservices_1 = require("@nestjs/microservices");
const common_3 = require("@nestjs/common");
let ConversationsController = class ConversationsController {
    constructor(conversationsService) {
        this.conversationsService = conversationsService;
    }
    create(createConversationDto, user) {
        return this.conversationsService.create(createConversationDto);
    }
    findAll(user) {
        return this.conversationsService.findAll(user);
    }
    findOne(id) {
        return this.conversationsService.findOne(id);
    }
    close(id, closeConversationDto, user) {
        return this.conversationsService.close(id, closeConversationDto, user);
    }
    findMessages(id) {
        return this.conversationsService.findMessages(id);
    }
    answerMessages(id, answerMessagesDto) {
        return this.conversationsService.answerMessages(id, answerMessagesDto);
    }
    receiveMessages(data) {
        return this.conversationsService.receiveMessages(data.receiveMessagesDto);
    }
};
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_dto_1.CreateConversationDto,
        common_2.User]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./models/conversation.entity").Conversation] }),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.User]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./models/conversation.entity").Conversation }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./models/conversation.entity").Conversation }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, close_conversation_dto_1.CloseConversationDto, common_2.User]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "close", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Patch)(':id/messages'),
    openapi.ApiResponse({ status: 200, type: require("./models/conversation.entity").Conversation }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "findMessages", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Patch)(':id/answer'),
    openapi.ApiResponse({ status: 200, type: require("./models/message.entity").Message }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, answer_messages_dto_1.AnswerMessagesDto]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "answerMessages", null);
__decorate([
    (0, microservices_1.MessagePattern)('receive_messages'),
    (0, common_3.UsePipes)(new common_3.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: require("./models/message.entity").Message }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "receiveMessages", null);
ConversationsController = __decorate([
    (0, common_1.Controller)('conversations'),
    __metadata("design:paramtypes", [conversations_service_1.ConversationsService])
], ConversationsController);
exports.ConversationsController = ConversationsController;
//# sourceMappingURL=conversations.controller.js.map