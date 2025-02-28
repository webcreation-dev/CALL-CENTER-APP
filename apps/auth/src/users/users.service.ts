import {
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  User,
  MESSAGING_SERVICE,
} from '@app/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(MESSAGING_SERVICE) private readonly messagingService: ClientProxy,
  ) {}

  async findOne(id: number) {
    return this.usersRepository.findOne({ id });
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    return this.usersRepository.create(user);
  }

  async getUser({ id }: User) {
    const user = await this.usersRepository.findOne({ id });
    return user;
  }
}
