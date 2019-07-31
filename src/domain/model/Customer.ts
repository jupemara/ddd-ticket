import { CustomerType } from './CustomerType';

export class Customer implements Customer {
  constructor(private readonly customerType: CustomerType) {}
  kindOf(): CustomerType {
    return this.customerType;
  }
}