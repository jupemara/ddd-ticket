import { Customer } from '../../domain/model/Customer';
import { Movie } from '../../domain/model/Movie';
import { Payload } from './request_payload/CalculateAmountOfTickets';
import { Tickets } from '../../domain/model/Tickets';
import { Datetime } from '../../domain/model/ScreenScheduleType';
import { Customers } from '../../domain/model/Customers';
import { CalculateAmountOfTicketsUsecase } from '../../usecase/CalculateAmountOfTicketsUsecase';

export class CalculateAmountOfTicketsController {
  constructor(private readonly usecase: CalculateAmountOfTicketsUsecase) {} 
  execute(payload: Payload): Tickets {
    const movie = new Movie(payload.movie);
    const customers: Customers = new Customers(payload.customerTypes.map(customerType => {
      return new Customer(customerType);
    }));
    const datetime = payload.datetime as Datetime;
    return this.usecase.execute(
      movie,
      customers,
      datetime
    );
  }
}