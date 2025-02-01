import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
export class CloseConversationDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
}
