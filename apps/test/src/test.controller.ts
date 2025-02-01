import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { TestService } from './test.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { CreateChargeDto } from '@app/common';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getHello(): string {
    return this.testService.getHello();
  }

  @MessagePattern('test_create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: CreateChargeDto) {
    return this.testService.createCharge(data);
  }

  @MessagePattern('res_test_from_microservices')
  @UsePipes(new ValidationPipe())
  async res_test_from_microservices() {
    return { success: true };
  }
}
