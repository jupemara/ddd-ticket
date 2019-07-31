import { CalculateAmountOfTicketsHandler } from './external_interface/cli/CalculateAmountOfTicketsHandler';
import { CalculateAmountOfTicketsController } from './adapter/controller/CalculateAmountOfTicketsController';
import { CalculateAmountOfTicketsPresenter } from './adapter/presenter/CalculateAmountOfTicketsPresenter';
import { CalculateAmountOfTicketsUsecase } from './usecase/CalculateAmountOfTicketsUsecase';
import { ScreenScheduleTypeDetector } from './domain/service/ScreenScheduleTypeDetector';
import { HolidayDetector } from './adapter/infrastructure/HolidayDetector';
import { DatetimeParser } from './adapter/infrastructure/DatetimeParser';

export function main(input: string): void {
  const handler = new CalculateAmountOfTicketsHandler(
    new CalculateAmountOfTicketsController(
      new CalculateAmountOfTicketsUsecase(
        new ScreenScheduleTypeDetector(
          new DatetimeParser(),
          new HolidayDetector()
        )
      )
    ),
    new CalculateAmountOfTicketsPresenter
  );
  handler.handle(input);
}