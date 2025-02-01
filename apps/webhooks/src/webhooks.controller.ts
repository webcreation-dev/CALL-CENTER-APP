import { Controller, UsePipes, ValidationPipe, Post, Body } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WhatsAppInboundMessagesDto } from './dto/whatsapp-inbound-messages.dto';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('whatsapp')
  async receiveWhatsAppMessage(@Body() whatsAppInboundMessagesDto: WhatsAppInboundMessagesDto) {
    await this.webhooksService.processWhatsAppMessage(whatsAppInboundMessagesDto);
  }

}
