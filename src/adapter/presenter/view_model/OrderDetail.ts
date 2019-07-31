export interface OrderDetail {
  tickets: Ticket[],
  amountOfPrice: number;
}

interface Ticket {
  customerType: string;
  price: number;
}