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
exports.Conversation = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_1 = require("../../../../libs/common/src");
const message_entity_1 = require("./message.entity");
const status_conversation_enum_1 = require("../enums/status_conversation.enum");
const canal_type_enum_1 = require("../enums/canal_type.enum");
let Conversation = class Conversation extends common_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { phone_number: { required: true, type: () => String }, status: { required: true, enum: require("../enums/status_conversation.enum").StatusConversationEnum }, canal: { required: true, enum: require("../enums/canal_type.enum").CanalTypeEnum }, reason: { required: true, type: () => String }, first_response_at: { required: true, type: () => Date }, closed_at: { required: true, type: () => Date }, user_id: { required: true, type: () => Number }, messages: { required: true, type: () => [require("./message.entity").Message] } };
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Conversation.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_conversation_enum_1.StatusConversationEnum,
        enumName: 'status_conversation_enum',
        default: status_conversation_enum_1.StatusConversationEnum.OPEN
    }),
    __metadata("design:type", String)
], Conversation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: canal_type_enum_1.CanalTypeEnum,
        enumName: 'canal_type_enum',
    }),
    __metadata("design:type", String)
], Conversation.prototype, "canal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Conversation.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Conversation.prototype, "first_response_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Conversation.prototype, "closed_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Conversation.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.conversation, { cascade: true }),
    __metadata("design:type", Array)
], Conversation.prototype, "messages", void 0);
Conversation = __decorate([
    (0, typeorm_1.Entity)()
], Conversation);
exports.Conversation = Conversation;
//# sourceMappingURL=conversation.entity.js.map