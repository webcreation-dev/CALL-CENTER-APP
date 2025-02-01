import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { WhatsAppInboundMessagesDto } from './dto/whatsapp-inbound-messages.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGING_SERVICE } from '@app/common';
import { firstValueFrom, catchError } from 'rxjs';
import { CanalTypeEnum } from 'apps/messaging/src/enums/canal_type.enum';


@Injectable()
export class WebhooksService {
  constructor(private readonly configService: ConfigService,
    @Inject(MESSAGING_SERVICE) private readonly messagingService: ClientProxy,
  ) {}


  async processWhatsAppMessage(whatsAppInboundMessagesDto: WhatsAppInboundMessagesDto) {

    const receiveMessages = {
      phone_number: whatsAppInboundMessagesDto.From,
      canal: CanalTypeEnum.WHATSAPP,
      message: whatsAppInboundMessagesDto.Body,
      userId: 1
    }

    const result = await firstValueFrom(
      this.messagingService.send('receive_messages', { receiveMessages: receiveMessages }).pipe(
        catchError(() => {
          throw new NotFoundException('Une erreur est survenue.');
        }),
      ),
    );

    return result;

  }

}
