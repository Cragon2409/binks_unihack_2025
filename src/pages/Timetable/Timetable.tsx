import { useEffect, useMemo } from 'react';
import { Flex, Select, Typography } from 'antd';
import type { SelectProps } from 'antd';

import { useAppSelector, useAppDispatch } from '../../API/hooks';
import { fetchAssessments } from '../../API/assessmentsSlice';
import { fetchCourses } from '../../API/coursesSlice';

import { WeeklyCalendar } from '../../components/WeeklyCalendar/WeeklyCalendar';
import { GenericEvent } from '../../common/Types';

const { Text } = Typography;

export default function Timetable() {
  const courses = useAppSelector((state) => state.courses);
  const assessments = useAppSelector((state) => state.assessments);
  const session = useAppSelector((state) => state.session.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      dispatch(fetchAssessments((session as any)?.user.id));
      dispatch(fetchCourses((session as any)?.user.id));
    }
  }, []);

  const events: GenericEvent[] = useMemo(() => (
    assessments.status === 'succeeded' ?  
      assessments.assessments.map((assessment) => ({
        eventId: assessment.id,
        startTime: new Date(2025, 2, 12, 12, 0, 0), 
        endTime: new Date(2025, 2, 12, 14, 30, 0), 
        title: assessment.title, 
        backgroundColor: 'red' // TODO: Get colour from course table
      }))
    : []
  ), [assessments]);

  const options: SelectProps['options'] = useMemo(() => (
    courses.status === 'succeeded' ?
      courses.courses.map((course) => (
        {
          label: course.name,
          value: course.id
        }
      ))
   : []
  ), [courses]);

  return (
    <Flex vertical gap='large'>
      <Flex vertical gap='small'>
        <Text strong>
          Courses
        </Text>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder='Select courses'
          defaultValue={[]}
          onChange={() => {}}
          options={options}
        />
      </Flex>
      <WeeklyCalendar 
        events={events}
        onEventClick={(event) => console.log(event)}
        onSelectDate={(date) => console.log(date)}
        weekends={false}
      />
    </Flex>
  );
}