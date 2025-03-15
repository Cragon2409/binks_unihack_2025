/**
 * This file was adapted from https://github.com/codeuniversity/antd-weekly-calendar 
 * under a MIT licence
 */

import { useEffect, useRef } from 'react';
import { Table, Grid } from 'antd';

import { GenericEvent, CalendarBodyProps } from '../../common/Types';
import { getDayHoursEvents, calculateScrollOffset } from '../../common/Utils';
import { createDayColumns, SCROLL_TO_ROW } from './Columns';

const { useBreakpoint } = Grid;

function WeeklyCalendarBody<T extends GenericEvent>({
  weekDatesRange,
  getDayEvents,
  onEventClick,
  weekends,
}: CalendarBodyProps<T>) {
  const rowRef = useRef<null | HTMLDivElement>(null);
  const tableContainerRef = useRef<null | HTMLDivElement>(null);

  const screens = useBreakpoint();

  useEffect(() => {
    if (rowRef.current && tableContainerRef.current && 'scrollTo' in tableContainerRef.current) {
      const scrollOffset = calculateScrollOffset(tableContainerRef.current, rowRef.current);
      tableContainerRef.current.scrollTo({ top: scrollOffset, behavior: 'smooth' });
    }
  }, [SCROLL_TO_ROW]);

  const fontSize = screens.xs ? '12px' : '14px';
  const hourColumn = {
    title: (
      <div
        style={{
          fontSize: screens.xs ? '14px' : '16px',
          textAlign: 'center',
          padding: '8px 0',
        }}
      >
        Hours
      </div>
    ),
    dataIndex: 'hour',
    key: 'hour',
    width: screens.xs ? 50 : 1,
    render: (hour: string, { }, id: number) => {
      return {
        props: {
          style: {
            width: screens.xs ? '30%' : '10%',
            fontSize: fontSize,
          },
        },
        children: SCROLL_TO_ROW === id ? (
          <div ref={rowRef}>{hour}</div>
        ) : (
          <div>{hour}</div>
        ),
      };
    },
  };

  const dayColumns = createDayColumns(weekDatesRange, weekends, onEventClick).map((col) => ({
    ...col,
    title: (
      <div
        style={{
          whiteSpace: 'nowrap',
          fontSize: fontSize,
        }}
      >
        {/*  @ts-ignore */}
        {col.title}
      </div>
    ),
  }));

  const tableColumns = [hourColumn, ...dayColumns];

  return (
    <div
      ref={tableContainerRef}

      style={{
        height: '80vh', // Set a fixed height for the container
        overflow: 'auto', // Allow both vertical and horizontal scrolling within the container only
      }}
    >
      <Table
        rowKey={(record) => record.id}
        dataSource={getDayHoursEvents(weekDatesRange, getDayEvents)}
        columns={tableColumns}
        pagination={false}
        bordered={true}
        showHeader={true}
        onRow={() => {
          return {
            style: {
              padding: '8px 0',
            },
          };
        }}

      />
    </div>
  );
}

export default WeeklyCalendarBody;