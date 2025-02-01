import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WhatsAppInboundMessagesDto } from './dto/whatsapp-inbound-messages.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGING_SERVICE } from '@app/common';
import { firstValueFrom, catchError } from 'rxjs';


@Injectable()
export class WebhooksService {
  constructor(private readonly configService: ConfigService,
    @Inject(MESSAGING_SERVICE) private readonly messagingService: ClientProxy,
  ) {}


  async processWhatsAppMessage(whatsAppInboundMessagesDto: WhatsAppInboundMessagesDto) {

    const receiveMessages = {
      phone_number: whatsAppInboundMessagesDto.From,
      canal: "WHATSAPP",
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
