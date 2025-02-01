import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashingService, User } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { RequestUser } from './interfaces/request-user.interface';
import { UsersRepository } from './users/users.repository';
import { GetUserDto } from './users/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async login(user: User) {
    const tokenPayload: TokenPayload = { userId: user.id };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    return this.jwtService.sign(tokenPayload);
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async validateLocal(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const isMatch = await this.hashingService.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.createRequestUser(user);
  }

  async validateJwt(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  private createRequestUser(user: User) {
    const { id } = user;
    const requestUser: RequestUser = { id };
    return requestUser;
  }

  async validateToken(jwt: string) {
    const payload: TokenPayload = this.jwtService.verify(jwt);
    return this.usersRepository.findOne(
      { id: payload.userId },
    );
  }

  async getUser(user: User) {
    const CurrentUser = await this.usersService.getUser(user);
    return CurrentUser;
  }

}
