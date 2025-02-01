import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CanalTypeEnum } from '../enums/canal_type.enum';
import { IsNumber } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsEnum(CanalTypeEnum)
  @IsNotEmpty()
  canal: CanalTypeEnum;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
