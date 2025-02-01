import { Inject, Injectable } from '@nestjs/common';
import {
  AUTH_SERVICE,
  NOTIFICATIONS_SERVICE,
  PAYMENTS_SERVICE,
  User,
} from '@app/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Reservation } from './models/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async req_reservations_to_payments() {
    return this.paymentsService
      .send('res_payments_from_microservices', {})
      .pipe(
        map((res) => {
          return 'Connection successful payments from reservations';
        }),
      );
  }

  async create(
    createReservationDto: CreateReservationDto,
    // { email, id }: User,
  ) {
    return this.paymentsService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map((res) => {
          // const reservation = new Reservation({
          //   ...createReservationDto,
          //   invoiceId: res.id,
          //   timestamp: new Date(),
          //   userId: 1
          // });
          // return this.reservationsRepository.create(reservation);
          return { success: true };
        }),
      );
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(id: number) {
    return this.reservationsRepository.findOne({ id });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { id },
      updateReservationDto,
    );
  }

  async remove(id: number) {
    return this.reservationsRepository.findOneAndDelete({ id });
  }

  async req_reservations_to_auth() {
    return this.authService.send('res_auth_from_microservices', {}).pipe(
      map((res) => {
        return 'Connection successful auth from reservations';
      }),
    );
  }

  async req_reservations_to_notifications() {
    return this.notificationsService
      .send('res_notifications_from_microservices', {})
      .pipe(
        map((res) => {
          return 'Connection successful auth from notifications';
        }),
      );
  }
}
