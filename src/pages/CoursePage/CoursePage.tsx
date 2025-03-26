import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Flex,
  Typography,
  Spin
} from 'antd';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'

import { Course } from '../../common/Types';

const { Title } = Typography;

const CoursePage = () => {
  // Extract courseId from the URL
  const { courseId } = useParams(); 
  const [ course, setCourse ] = useState<Course | null>(null);
  const courses = useAppSelector(( state ) => state.courses.courses);
  const session = useAppSelector(( state ) => state.session.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourses((session as any)?.user.id));
  }, [session]);

  useEffect(() => {
    if (courses.length > 0 && courseId) {
      setCourse(
        courses.find((course) => course.id === Number(courseId)) || null
      );
    }
  })

  return (
    <Flex vertical>
      {
        course ? (
          <Title>{course.name}</Title>
        ) :
        <Spin />
      }
      
    </Flex>
  )
}

export default CoursePage