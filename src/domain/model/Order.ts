import { Movie } from './Movie';
import { ScreenSchedule } from './ScreenSchedule';
import { Tickets } from './Tickets';
import { Ticket } from './Ticket';
import { handicapped, handicappedPartner, handicappedStudentPartner, handicappedStudent } from './CustomerType';
import { Customers } from './Customers';

export class Order {
  constructor(
    private movie: Movie,
    private customers: Customers,
    private screenSchedule: ScreenSchedule
  ) {}
  tickets(): Tickets {
    return new Tickets(this.customers.customers.map(customer => {
      return new Ticket(this.movie, customer, this.screenSchedule);
    }));
  }
  validate(): void {
    if (this.isAlone()) {
      return;
    }
    this.validateHandicappedPartner(this.customers);
    this.validateHandicappedStudentPartner(this.customers);
  }
  private isAlone(): boolean {
    return this.customers.countAll() < 2;
  }
  private validateHandicappedPartner(customers: Customers): void {
    const numberOfHandicapped = customers.countUpBy(handicapped),
      numberOfHandicappedPartners = customers.countUpBy(handicappedPartner);
    if (numberOfHandicapped === numberOfHandicappedPartners) {
      return;
    }
    if (numberOfHandicapped < numberOfHandicappedPartners) {
      throw new Error('Too many handicapped student partners against actual handicapped') as TooManyHandicappedStudentPartnerError;
    }
    throw new Error('This customers can use more discount') as AvailableHandicappedStudentPartnerDiscountError;
  }
  private validateHandicappedStudentPartner(customers: Customers): void {
    const numberOfHandicapped = customers.countUpBy(handicappedStudent),
      numberOfHandicappedPartners = customers.countUpBy(handicappedStudentPartner);
    if (numberOfHandicapped === numberOfHandicappedPartners) {
      return;
    }
    if (numberOfHandicapped < numberOfHandicappedPartners) {
      throw new Error('Too many handicapped student partners against actual handicapped') as TooManyHandicappedStudentPartnerError;
    }
    throw new Error('This customers can use more discount') as AvailableHandicappedStudentPartnerDiscountError;
  }
}

export type TooManyHandicappedPartnerError = Error;
export type AvailableHandicappedPartnerDiscountError = Error;
export type TooManyHandicappedStudentPartnerError = Error;
export type AvailableHandicappedStudentPartnerDiscountError = Error;