import { IsEmail, IsString } from 'class-validator';

export class WhatsAppInboundMessagesDto {
  @IsEmail()
  From: string;

  @IsString()
  Body: string;
}
