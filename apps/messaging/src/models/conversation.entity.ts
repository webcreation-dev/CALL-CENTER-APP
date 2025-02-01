import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Message } from './message.entity';
import { StatusConversationEnum } from '../enums/status_conversation.enum';
import { CanalTypeEnum } from '../enums/canal_type.enum';

@Entity()
export class Conversation extends AbstractEntity<Conversation> {
  @Column()
  phone_number: string;

  @Column({
    type: 'enum',
    enum: StatusConversationEnum,
    enumName: 'status_conversation_enum',
    default: StatusConversationEnum.OPEN

  })
  status: StatusConversationEnum;

  @Column({
    type: 'enum',
    enum: CanalTypeEnum,
    enumName: 'canal_type_enum',
  })
  canal: CanalTypeEnum;
  
  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  first_response_at: Date;

  @Column({ nullable: true })
  closed_at:Date;

  @Column()
  user_id: number;
  
  @OneToMany(() => Message, (message) => message.conversation, { cascade: true })
  messages: Message[];
}
  