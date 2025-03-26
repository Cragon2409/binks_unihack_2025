import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Flex,
  Typography,
  Spin
} from 'antd';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'
import { fetchAssessments } from '../../API/assessmentsSlice';

import { Assessment, Course } from '../../common/Types';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard';

const { Title } = Typography;

/*
TODO This page requires a lot of work:
- Create a new Course slice for a single course
- Retrieve assessments
- Show loading skeletons
*/

const CoursePage = () => {
  // Extract courseId from the URL
  const { courseId } = useParams(); 
  const [ course, setCourse ] = useState<Course | null>(null);
  const [ courseAssessments, setCourseAssessments ] = useState<Assessment[]>([]); 
  const courses = useAppSelector(( state ) => state.courses.courses);
  const assessments = useAppSelector(( state ) => state.assessments.assessments);
  const session = useAppSelector(( state ) => state.session.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      dispatch(fetchCourses(session.user.id));
      dispatch(fetchAssessments(session.user.id));
    }
  }, [session]);

  useEffect(() => {
    if (courses.length > 0 && courseId) {
      setCourse(
        courses.find((course) => course.id === Number(courseId)) || null
      );
    }
  }, [courses])

  useEffect(() => {
    if (course) {
      setCourseAssessments(assessments.filter((assessments) => assessments.courseId == course.id));
    }
  }, [course])

  const getAssessmentCards = () => {
    let cards = courseAssessments.map((assessment, index) =>(
      <AssessmentCard key={index} assessment={assessment} />
    ))
    // cards.push(createCardButton)
    return cards
  }

  return (
    <Flex vertical>
      {
        course ? (
          <Flex vertical>
            <Title>{course.name}</Title>
            <Flex wrap gap="large">
              {getAssessmentCards()}
            </Flex>
          </Flex>
        ) :
        <Spin />
      }
      
    </Flex>
  )
}

export default CoursePage