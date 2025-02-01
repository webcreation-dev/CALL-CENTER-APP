import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Conversation } from './conversation.entity';
import { SenderTypeEnum } from '../enums/sender_type.enum';
import { StatusMessageEnum } from '../enums/status_message.enum';

@Entity()
export class Message extends AbstractEntity<Message> {
  @Column()
  url: string;

  @Column({
    type: 'enum',
    enum: SenderTypeEnum,
    enumName: 'sender_type_enum',
  })
  sender_type: SenderTypeEnum;

  @Column({
    type: 'enum',
    enum: StatusMessageEnum,
    enumName: 'status_message_enum',
    default: StatusMessageEnum.QUEUED,
  })
  status: StatusMessageEnum;

  @Column()
  message: string;

  @Column({ nullable: true })
  sid: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
  })
  conversation: Conversation;
}