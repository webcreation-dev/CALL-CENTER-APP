import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { CanalTypeEnum } from '../enums/canal_type.enum';
export class ReceiveMessagesDto {

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsEnum(CanalTypeEnum)
  @IsNotEmpty()
  canal: CanalTypeEnum;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
