/**
 * This file was adapted from https://github.com/codeuniversity/antd-weekly-calendar 
 * under a MIT licence
 */

import React from 'react';
import { Button, Row, Col, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  addWeeks,
  startOfWeek,
  endOfWeek,
  getMonth,
  format,
} from 'date-fns';

import DatePicker from './DatePicker';

import { CalendarHeaderProps } from '../../common/Types';

const { Text } = Typography;

interface MonthNameProps {
  startWeek: Date;
}

const MonthName: React.FunctionComponent<MonthNameProps> = ({ startWeek }) => {
  const getMonthName = () => {
    const endOfWeekDate = endOfWeek(startWeek);

    if (getMonth(endOfWeekDate) == getMonth(startWeek)) {
      return format(startWeek, 'MMM');
    }

    return format(startWeek, 'MMM') + '-' + format(endOfWeekDate, 'MMM');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', maxHeight: '25px' }}>
      <Text
        style={{
          fontSize: "20px",
        }} 
        strong
      >
        {getMonthName()}
      </Text>
    </div>
  );
};

export const WeeklyCalendarHeader: React.FunctionComponent<CalendarHeaderProps> = ({
  startWeek,
  setStartWeek,
}) => {
  return (
    <>
      <Row style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ alignSelf: 'center' }}>
          <MonthName startWeek={startWeek} />
        </div>
      </Row>
      <Row gutter={[0, 20]} justify="space-between" style={{ marginBottom: '20px' }}>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', marginRight: '20px' }}>
            <Button onClick={() => setStartWeek(startOfWeek(new Date()))}>
              Today
            </Button>
            <div style={{ display: 'flex', padding: '0 10px' }}>
              <Button
                style={{ margin: '0 5px' }}
                onClick={() => setStartWeek(addWeeks(startWeek, -1))}
              >
                <LeftOutlined />
              </Button>
              <Button
                style={{ margin: '0 5px' }}
                onClick={() => setStartWeek(addWeeks(startWeek, 1))}
              >
                <RightOutlined />
              </Button>
            </div>
          </div>

        </Col>
        <Col>
          <DatePicker
            onChange={date => {
              if (date) {
                setStartWeek(startOfWeek(new Date(date)));
              }
            }}
            picker="week"
            defaultValue={startOfWeek(new Date())}
          />
        </Col>
      </Row>
    </>
  );
};