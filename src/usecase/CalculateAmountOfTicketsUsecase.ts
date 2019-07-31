import { Movie } from '../domain/model/Movie';
import { Customers } from '../domain/model/Customers';
import { ScreenSchedule } from '../domain/model/ScreenSchedule';
import { Tickets } from '../domain/model/Tickets';
import { Order } from '../domain/model/Order';
import { Datetime } from '../domain/model/ScreenScheduleType';
import { ScreenScheduleTypeDetector } from '../domain/service/ScreenScheduleTypeDetector';

export class CalculateAmountOfTicketsUsecase {
  constructor(private readonly screenScheduleTypeDetector: ScreenScheduleTypeDetector) {}
  execute(
    movie: Movie,
    customers: Customers,
    datetime: Datetime,
  ): Tickets {
    const screenSchedule = new ScreenSchedule(
      this.screenScheduleTypeDetector.detectBy(datetime)
    );
    const order = new Order(movie, customers, screenSchedule);
    order.validate();
    const tickets =  order.tickets();
    tickets.validate();
    return tickets;
  }
}