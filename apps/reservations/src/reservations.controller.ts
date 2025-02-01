import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, RoleEnum, Roles, User } from '@app/common';
import { MessagePattern } from '@nestjs/microservices';
import { ValidationPipe, UsePipes } from '@nestjs/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: User,
  ) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.USER)
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.USER)
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }

  @Post('req_reservations_to_payments')
  async req_reservations_to_payments() {
    return this.reservationsService.req_reservations_to_payments();
  }
  @Post('req_reservations_to_notifications')
  async req_reservations_to_notifications() {
    return this.reservationsService.req_reservations_to_notifications();
  }

  @Post('req_reservations_to_auth')
  async req_reservations_to_auth() {
    return this.reservationsService.req_reservations_to_auth();
  }

  @MessagePattern('res_reservations_from_microservices')
  @UsePipes(new ValidationPipe())
  async res_reservations_from_microservices() {
    return { success: true };
  }
}
