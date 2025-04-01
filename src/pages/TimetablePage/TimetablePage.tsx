import { useState, useEffect, useMemo } from 'react';

import { 
  Flex, 
  Select, 
  Breadcrumb, 
  Button 
} from 'antd';
import type { SelectProps } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { addHours } from 'date-fns';

import { useAppSelector, useAppDispatch } from '../../API/hooks';
import { fetchAssessments } from '../../API/assessmentsSlice';
import { fetchCourses } from '../../API/coursesSlice';

import { WeeklyCalendar } from '../../components/WeeklyCalendar/WeeklyCalendar';
import { GenericEvent } from '../../common/Types';

// import { downloadICS } from './export-funcs';

export default function TimetablePage() {
  const session = useAppSelector((state) => state.session.session);
  const courses = useAppSelector((state) => state.courses);
  const assessments = useAppSelector((state) => state.assessments);
  const dispatch = useAppDispatch();
  const [ courseFilter, setCourseFilter ] = useState<number[]>([]);

  useEffect(() => {
    if (session) {
      dispatch(fetchAssessments(session.user.id));
      dispatch(fetchCourses(session.user.id));
    }
  }, []);

  const events: GenericEvent[] = useMemo(() => (
    assessments.status === 'succeeded' && courses.status === 'succeeded' ?  
      assessments.assessments
        .filter((assessment) => courseFilter.includes(assessment.courseId))
        .map((assessment) => {
          let dueDate = new Date(assessment.dueDate);
          return {
            eventId: assessment.id.toString(),
            startTime: dueDate, 
            endTime: addHours(dueDate, 1),
            title: assessment.name, 
            backgroundColor: courses.courses.find((course) => course.id === assessment.courseId)?.colour
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
    <Flex 
      style={{
        padding: 24
      }}
      vertical 
      gap='large'
    >
      <Breadcrumb
        items={[
          {
            title: 'Timetable',
          }
        ]}
      />
      <Flex vertical gap='small'>
        <Flex gap="large">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder='Select courses'
            value={courseFilter}
            onChange={(values) => {setCourseFilter(values)}}
            options={options}
          />

          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            size={"large"}
          >
            Download .ics file
          </Button>
        </Flex>
      </Flex>
      <WeeklyCalendar 
        events={events}
        onEventClick={(event) => console.log(event)}
        onSelectDate={(date) => console.log(date)}
        weekends={true}
      />
    </Flex>
  );
}