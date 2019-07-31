import {
  Datetime,
  ScreenScheduleType,
  DayOfTheWeek,
  dayOfMovie,
  dayTimeOfWeekDay,
  lateShowOfWeekDay,
  dayTimeOfWeekEndAndHolidays,
  lateShowOfWeekEndAndHolidays
} from '../model/ScreenScheduleType';
import { IDatetimeParser } from '../model/IDatetimeParser';
import { IHolidayDetector } from '../model/IHolidayDetector';

export class ScreenScheduleTypeDetector {
  constructor(
    private readonly datetimeParser: IDatetimeParser,
    private readonly holidayDetector: IHolidayDetector
  ) {}
  detectBy(datetime: Datetime): ScreenScheduleType {
    if (this.isMovieDay(datetime)) {
      return dayOfMovie;
    }
    if (this.isWeekDay(datetime) && this.isDayTime(datetime)) {
      return dayTimeOfWeekDay;
    }
    if (this.isWeekDay(datetime) && this.isLateShow(datetime)) {
      return lateShowOfWeekDay;
    }
    if (this.isWeekEndOrHoliday(datetime) && this.isDayTime(datetime)) {
      return dayTimeOfWeekEndAndHolidays;
    }
    if (this.isWeekEndOrHoliday(datetime) && this.isLateShow(datetime)) {
      return lateShowOfWeekEndAndHolidays;
    }
    throw new Error('Given datetime was be able to detected as "ScreenScheduleType"') as CouldNotDetectScreenScheduleError;
  }
  private isDayTime(datetime: Datetime): boolean {
    const endHour = 19,
      hour = this.datetimeParser.getHour(datetime);
    return endHour >= hour;
  }
  private isLateShow(datetime: Datetime): boolean {
    const startHour = 20,
      hour = this.datetimeParser.getHour(datetime);
    return startHour <= hour;
  }
  private isWeekDay(datetime: Datetime): boolean {
    const weekDays: DayOfTheWeek[] = [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
    ];
    const dayOfTheWeek = this.datetimeParser.getDayOfTheWeek(datetime);
    return weekDays.includes(dayOfTheWeek);
  }
  private isWeekEndOrHoliday(datetime: Datetime): boolean {
    return this.isWeekend(datetime) || this.isHoliday(datetime);
  }
  private isWeekend(datetime: Datetime): boolean {
    const weekEnds: DayOfTheWeek[] = ['Sat', 'Sun'];
    const dayOfTheWeek = this.datetimeParser.getDayOfTheWeek(datetime);
    return weekEnds.includes(dayOfTheWeek);
  }
  private isHoliday(datetime: Datetime): boolean {
    return this.holidayDetector.isHoliday(datetime);
  }
  private isMovieDay(datetime: Datetime): boolean {
    const movieDay = 1;
    const day = this.datetimeParser.getDay(datetime);
    return day === movieDay;
  }
}

export type CouldNotDetectScreenScheduleError = Error;