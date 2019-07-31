import {
  Datetime,
  Day,
  Hour,
  DayOfTheWeek
} from './ScreenScheduleType';

export interface IDatetimeParser {
  getDay(datetime: Datetime): Day;
  getHour(datetime: Datetime): Hour;
  getDayOfTheWeek(datetime: Datetime): DayOfTheWeek;
}