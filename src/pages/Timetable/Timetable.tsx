import { useState, useEffect, useMemo } from 'react';
import { Flex, Select, Typography } from 'antd';
import type { SelectProps } from 'antd';

import { useAppSelector, useAppDispatch } from '../../API/hooks';
import { fetchAssessments } from '../../API/assessmentsSlice';
import { fetchCourses } from '../../API/coursesSlice';

import { WeeklyCalendar } from '../../components/WeeklyCalendar/WeeklyCalendar';
import { GenericEvent } from '../../common/Types';
import { addHours } from 'date-fns';

const { Text } = Typography;

export default function Timetable() {
  const courses = useAppSelector((state) => state.courses);
  const assessments = useAppSelector((state) => state.assessments);
  const session = useAppSelector((state) => state.session.session);
  const dispatch = useAppDispatch();

  const [ courseFilter, setCourseFilter ] = useState<number[]>([]);

  useEffect(() => {
    if (session) {
      dispatch(fetchAssessments((session as any)?.user.id));
      dispatch(fetchCourses((session as any)?.user.id));
    }
  }, []);

  const events: GenericEvent[] = useMemo(() => (
    assessments.status === 'succeeded' && courses.status === 'succeeded' ?  
      assessments.assessments
        .filter((assessment) => courseFilter.includes(assessment.course_id))
        .map((assessment) => {
          let dueDate = new Date(assessment.due_date);
          return {
            eventId: assessment.id,
            startTime: dueDate, 
            endTime: addHours(dueDate, 1),
            title: assessment.name, 
            backgroundColor: courses.courses.find((course) => course.id === assessment.course_id).colour_code
          };
        }
      )
    : []
  ), [assessments, courseFilter]);
    
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

  useEffect(() => {
    setCourseFilter(courses.courses.map((course) => course.id));
  }, [courses.courses]);

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
          value={courseFilter}
          onChange={(values) => {setCourseFilter(values)}}
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