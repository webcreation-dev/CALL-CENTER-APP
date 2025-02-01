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
exports.UsersSubscriber = void 0;
const common_1 = require("../../../../../libs/common/src");
const typeorm_1 = require("typeorm");
let UsersSubscriber = class UsersSubscriber {
    constructor(dataSource, hashingService) {
        this.dataSource = dataSource;
        this.hashingService = hashingService;
        dataSource.subscribers.push(this);
    }
    async beforeInsert(event) {
        const { entity: user } = event;
        user.password = await this.hashingService.hash(user.password);
    }
    async beforeUpdate(event) {
        const { entity, databaseEntity: databaseUser } = event;
        const user = entity;
        if (user.password !== databaseUser.password) {
            user.password = await this.hashingService.hash(user.password);
        }
    }
    listenTo() {
        return common_1.User;
    }
};
UsersSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        common_1.HashingService])
], UsersSubscriber);
exports.UsersSubscriber = UsersSubscriber;
//# sourceMappingURL=users.subscriber.js.map