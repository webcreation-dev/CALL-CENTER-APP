import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrentUser, User } from '@app/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    const jwt = await this.authService.login(user);
    return { access_token: jwt };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const email = await this.authService.register(createUserDto);
    return email;
  }

  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    const user = await this.authService.validateToken(data.Authentication);
    return user;
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return await this.authService.getUser(user);
  }

}
