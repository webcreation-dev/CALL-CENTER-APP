import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { Conversation } from './models/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ConversationsRepository extends AbstractRepository<Conversation> {
  protected readonly logger = new Logger(ConversationsRepository.name);

  constructor(
    @InjectRepository(Conversation)
    itemsRepository: Repository<Conversation>,
    entityManager: EntityManager,
  ) {
    super(itemsRepository, entityManager);
  }
}
