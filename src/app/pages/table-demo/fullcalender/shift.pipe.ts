import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { getWeekDay } from 'src/app/shared/helpers/functions';

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const dateValue = moment(value).add({ hour: 7 });
      const weekDay = getWeekDay(dateValue);
      const day = dateValue.date();
      const month = dateValue.month() + 1;
      const year = dateValue.year();
      return `${weekDay}, ngày ${day} tháng ${month} năm ${year}`;
    }
    return '';
  }
}

@Pipe({
  name: 'isFeatureDate'
})
export class IsFeatureDatePipe implements PipeTransform {
  transform(value: Date): boolean {
    const currentDate = moment();
    return moment(value).isAfter(currentDate);
  }
}

@Pipe({
  name: 'displayTime'
})
export class DisplayTimePipe implements PipeTransform {
  transform(value: string, type?: 'TO_DAY' | 'THE_NEXT_DAY'): string {
    return value ? value.substr(0, 5) + (type === 'THE_NEXT_DAY' ? ' hôm sau' : '') : '';
  }
}

@Pipe({
  name: 'displayStartEndCalendar'
})
export class DisplayStartEndCalendarPipe implements PipeTransform {
  transform({ start, end }: { start: string; end: string }): string {
    const momentStart = moment(start);
    const momentEnd = moment(end);
    const isNextDay = !momentStart.isSame(momentEnd, 'day');
    if (isNextDay) {
      return `(${momentStart.format('HH:mm')} - ${momentEnd.format('HH:mm')} hôm sau)`;
    }
    return `(${momentStart.format('HH:mm')} - ${momentEnd.format('HH:mm')})`;
  }
}
