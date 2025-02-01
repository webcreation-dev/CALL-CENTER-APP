import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CanalTypeEnum } from '../enums/canal_type.enum';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsEnum(CanalTypeEnum)
  @IsNotEmpty()
  canal: CanalTypeEnum;

  @IsString()
  @IsNotEmpty()
  message: string;
}
