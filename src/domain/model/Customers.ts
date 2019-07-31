import { Customer } from './Customer';
import { CustomerType } from './CustomerType';

export class Customers {
  constructor(private _customers: Customer[]) {}
  countUpBy(customerType: CustomerType): number {
    return this.customers.filter(customer => {
      return customer.kindOf() === customerType;
    }).length;
  }
  countAll(): number {
    return this.customers.length;
  }
  get customers(): Customer[] {
    return this._customers;
  }
}