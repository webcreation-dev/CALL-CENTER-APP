import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SenderTypeEnum } from '../enums/sender_type.enum';
export class AnswerMessagesDto {

  @IsString()
  @IsNotEmpty()
  message: string;
}
