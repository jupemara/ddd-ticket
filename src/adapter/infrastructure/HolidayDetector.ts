import { IHolidayDetector } from '../../domain/model/IHolidayDetector';
import { Datetime } from '../../domain/model/ScreenScheduleType';
import * as dayjs from 'dayjs';
import * as japaneseHoliday from 'japanese-holidays';

export class HolidayDetector implements IHolidayDetector {
  isHoliday(datetime: Datetime): boolean {
    const parsed = dayjs(datetime);
    return !!japaneseHoliday.isHoliday(parsed.toDate());
  }
} 