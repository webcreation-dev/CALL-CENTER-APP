import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { map } from 'rxjs';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16' as any,
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('RESERVATIONS_SERVICE')
    private readonly reservationsService: ClientProxy,
  ) {}

  async createCharge({ amount }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      automatic_payment_methods: {
        enabled: true,
      },
      confirm: true,
      payment_method: 'pm_card_visa',
      currency: 'usd',
    });

    // this.notificationsService.emit('notify_email', {
    //   email,
    //   text: `Your payment of $${amount} has completed successfully.`
    // });

    return paymentIntent;
  }
}
