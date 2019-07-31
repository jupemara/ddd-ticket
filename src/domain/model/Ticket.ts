import { Customer } from './Customer';
import { TicketPrice, priceList } from './Price';
import { Movie } from './Movie';
import { ScreenSchedule } from './ScreenSchedule';
import {
  miCardUser,
  parkingTicketWithDiscount80,
} from './CustomerType';
import { dayOfMovie } from './ScreenScheduleType';
import { special } from './MovieType';

export class Ticket {
  constructor(
    private readonly movie: Movie,
    private readonly _customer: Customer,
    private readonly screenSchedule: ScreenSchedule
  ) {}
  get customer(): Customer {
    return this._customer;
  }
  calculatePrice(): TicketPrice {
    const price = priceList[this.movie.kindOf()][this.screenSchedule.kindOf()][this._customer.kindOf()]
    if (!!price) {
      return price;
    }
    throw new Error('Specified combination is not applicable') as NotApplicableError;
  }
  validate(): void {
    this.validateApplicable();
    this.validateSpecial();
  }
  private validateApplicable(): void {
    if (
      this.customer.kindOf() === miCardUser &&
      this.screenSchedule.kindOf() === dayOfMovie
    ) {
      throw new Error('Specified combination is not applicable') as NotApplicableError;
    }
    if (
      this.customer.kindOf() === parkingTicketWithDiscount80 &&
      this.screenSchedule.kindOf() === dayOfMovie
    ) {
      throw new Error('Specified combination is not applicable') as NotApplicableError;
    }
  }
  private validateSpecial(): void {
    if (this.movie.kindOf() === special) {
      throw new Error('This movie is special one. Please ask our stuff for details');
    }
  }
}

export type NotApplicableError = Error;
export type NecessaryToAdkStuffError = Error;