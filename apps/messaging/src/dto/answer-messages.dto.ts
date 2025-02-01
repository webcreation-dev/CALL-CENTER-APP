import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
export class AnswerMessagesDto {

  @IsString()
  @IsNotEmpty()
  message: string;
}
