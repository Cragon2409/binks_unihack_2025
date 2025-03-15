/**
 * This file was adapted from https://github.com/codeuniversity/antd-weekly-calendar 
 * under a MIT licence
 */

import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { startOfWeek, endOfWeek } from 'date-fns';

import WeeklyCalendarBody from './WeeklyCalendarBody';
import { WeeklyCalendarHeader } from './WeeklyCalendarHeader';
import { GenericEvent, CalendarContainerProps } from '../../common/Types';
import { daysToWeekObject } from '../../common/Utils';

export function WeeklyCalendar<T extends GenericEvent>({
  events,
  onEventClick,
  onSelectDate,
  weekends = false,
  currentDate,
  value
}: CalendarContainerProps<T>) {
  const dateToUse = currentDate || value;

  const [startWeek, setStartWeek] = useState(startOfWeek(dateToUse || new Date(), { weekStartsOn: 0 }));
  const weekPeriod = {
    startDate: startWeek,
    endDate: endOfWeek(startWeek),
  };

  useEffect(() => {
    if (dateToUse && startOfWeek(dateToUse).getTime() !== startWeek.getTime()) {
      setStartWeek(dateToUse);
    }
  }, [dateToUse]);

  useEffect(() => {
    onSelectDate && onSelectDate(startWeek);
  }, [startWeek]);

  const weekObject = daysToWeekObject(events, startWeek);

  return (
    <Card>
      <WeeklyCalendarHeader startWeek={startWeek} setStartWeek={setStartWeek} />
      <WeeklyCalendarBody
        weekDatesRange={weekPeriod}
        getDayEvents={weekObject}
        onEventClick={onEventClick as (e: GenericEvent) => any}
        weekends={weekends}
      />
    </Card>
  );
}