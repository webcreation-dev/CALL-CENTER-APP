import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TestService {

  constructor(
      private readonly configService: ConfigService,
    ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16' as any,
    },
  );

  getHello(): string {
    return 'Hello World!';
  }

  async createCharge({ amount }: CreateChargeDto) {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        confirm: true,
        payment_method: 'pm_card_visa',
        currency: 'usd',
      });
  
      return paymentIntent;
    }
}
