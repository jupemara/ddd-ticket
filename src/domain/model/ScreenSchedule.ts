import { ScreenScheduleType } from './ScreenScheduleType';

export class ScreenSchedule implements ScreenSchedule {
  constructor(private readonly screenScheduleType: ScreenScheduleType) {}
  kindOf(): ScreenScheduleType {
    return this.screenScheduleType;
  }
}