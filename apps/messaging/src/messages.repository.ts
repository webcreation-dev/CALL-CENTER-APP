import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Message } from './models/message.entity';

@Injectable()
export class MessagesRepository extends AbstractRepository<Message> {
  protected readonly logger = new Logger(MessagesRepository.name);

  constructor(
    @InjectRepository(Message)
    itemsRepository: Repository<Message>,
    entityManager: EntityManager,
  ) {
    super(itemsRepository, entityManager);
  }
}
