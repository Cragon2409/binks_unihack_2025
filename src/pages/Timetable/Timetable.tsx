import { Typography } from 'antd';

import { WeeklyCalendar } from '../../components/WeeklyCalendar/WeeklyCalendar';

import { GenericEvent } from '../../common/Types';

const { Title } = Typography;

const events: GenericEvent[] = [
  { eventId: '1', startTime: new Date(2025, 2, 12, 12, 0, 0), endTime: new Date(2025, 2, 12, 14, 30, 0), title: 'Ap. 1', backgroundColor: 'red' },
  { eventId: '2', startTime: new Date(2025, 2, 14, 10, 0, 0), endTime: new Date(2025, 2, 14, 17, 15, 0), title: 'Ap. 2' },
];

export default function Timetable() {
  return (
    <>
      <Title>Timetable</Title>
      <WeeklyCalendar 
        events={events}
        onEventClick={(event) => console.log(event)}
        onSelectDate={(date) => console.log(date)}
        weekends={false}
      />
    </>
  );
}