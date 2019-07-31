import { IDatetimeParser } from '../../domain/model/IDatetimeParser';
import { 
  Datetime,
  Hour,
  Day,
  DayOfTheWeek
} from '../../domain/model/ScreenScheduleType';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

export class DatetimeParser implements IDatetimeParser {
  private parsed: Dayjs;
  getDay(datetime: Datetime): Day {
    return this.parse(datetime).date();
  }
  getHour(datetime: Datetime): Hour {
    return this.parse(datetime).hour();
  }
  getDayOfTheWeek(datetime: Datetime): DayOfTheWeek {
    return this.toDayOfTheWeek(this.parse(datetime).day());
  }
  private parse(datetime: Datetime): Dayjs {
    if (!!this.parsed) {
      return this.parsed;
    }
    return dayjs(datetime);
  }
  private toDayOfTheWeek(dayOfTheWeek: number): DayOfTheWeek {
    const daysOfTheWeek: DayOfTheWeek[] = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];
    return daysOfTheWeek[dayOfTheWeek];
  }
}