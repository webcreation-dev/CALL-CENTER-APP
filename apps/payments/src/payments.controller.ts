import { Controller, UsePipes, ValidationPipe, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { PaymentsService } from './payments.service';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: CreateChargeDto) {
    return { amount: 1000 };
    // return this.paymentsService.createCharge(data);
  }

  @MessagePattern('res_payments_from_microservices')
  @UsePipes(new ValidationPipe())
  async res_payments_from_microservices() {
    return { success: true };
  }
}
