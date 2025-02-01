import {
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { IsUnique, User } from '@app/common';

export class CreateUserDto {
  @IsEmail()
  @IsUnique(User, 'email', { message: 'Email already exists' })
  email: string;

  @IsStrongPassword()
  password: string;
}
