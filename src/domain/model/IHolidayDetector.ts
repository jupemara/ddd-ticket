import { Datetime } from './ScreenScheduleType';

export interface IHolidayDetector {
  isHoliday(datetime: Datetime): boolean;
}