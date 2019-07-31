import { CalculateAmountOfTicketsController } from '../../adapter/controller/CalculateAmountOfTicketsController';
import { CalculateAmountOfTicketsPresenter } from '../../adapter/presenter/CalculateAmountOfTicketsPresenter';
import { Payload } from '../../adapter/controller/request_payload/CalculateAmountOfTickets';

export class CalculateAmountOfTicketsHandler {
  constructor(
    private readonly controller: CalculateAmountOfTicketsController,
    private readonly presenter: CalculateAmountOfTicketsPresenter
  ) {}
  handle(input: string) {
    const payload = this.toPayload(input),
      tickets = this.controller.execute(payload),
      viewModel = this.presenter.convert(tickets);
    console.log(`
指定されたお客様のチケットの合計金額は${viewModel.amountOfPrice}円です。
内訳は
${viewModel.tickets.map(ticket => {
  return `${ticket.customerType}: ${ticket.price}円`;
}).join('\n')}
となります。
    `);
  }
  private toPayload(input: string): Payload {
    return JSON.parse(input) as Payload;
  }
}