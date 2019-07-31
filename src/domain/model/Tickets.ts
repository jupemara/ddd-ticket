import { Ticket } from './Ticket';
import { OrderPrice } from './Price';

export class Tickets {
  constructor(private readonly _tickets: Ticket[]) {}
  get tickets(): Ticket[] {
    return this._tickets;
  }
  calculatePrice(): OrderPrice {
    return this._tickets.reduce((acc, ticket) => {
      return acc + ticket.calculatePrice();
    }, 0);
  }
  validate(): void {
    this._tickets.forEach(ticket => {
      ticket.validate();
    });
  }
}