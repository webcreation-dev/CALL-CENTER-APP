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
exports.Message = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_1 = require("../../../../libs/common/src");
const conversation_entity_1 = require("./conversation.entity");
const sender_type_enum_1 = require("../enums/sender_type.enum");
const status_message_enum_1 = require("../enums/status_message.enum");
let Message = class Message extends common_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { sender_type: { required: true, enum: require("../enums/sender_type.enum").SenderTypeEnum }, status: { required: true, enum: require("../enums/status_message.enum").StatusMessageEnum }, message: { required: true, type: () => String }, sid: { required: true, type: () => String }, conversation: { required: true, type: () => require("./conversation.entity").Conversation } };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: sender_type_enum_1.SenderTypeEnum,
        enumName: 'sender_type_enum',
    }),
    __metadata("design:type", String)
], Message.prototype, "sender_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_message_enum_1.StatusMessageEnum,
        enumName: 'status_message_enum',
        default: status_message_enum_1.StatusMessageEnum.QUEUED,
    }),
    __metadata("design:type", String)
], Message.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "sid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversation_entity_1.Conversation, (conversation) => conversation.messages, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", conversation_entity_1.Conversation)
], Message.prototype, "conversation", void 0);
Message = __decorate([
    (0, typeorm_1.Entity)()
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map