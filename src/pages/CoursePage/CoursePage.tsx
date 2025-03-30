import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Flex,
  Breadcrumb,
  Typography
} from 'antd';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'
import { fetchAssessments } from '../../API/assessmentsSlice';

import { Assessment, Course } from '../../common/Types';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard';
import CreateAssessmentCard from '../../components/AssessmentCard/CreateAssessmentCard';
import CreateAssessmentDrawer from '../../components/drawers/CreateAssessmentDrawer';

const { Title } = Typography;

const CoursePage = () => {
  // Extract courseId from the URL
  const { courseId } = useParams(); 
  const [ course, setCourse ] = useState<Course | null>(null);
  const [ courseAssessments, setCourseAssessments ] = useState<Assessment[]>([]);
  const [ isCreateAssessmentDrawerOpen, setIsCreateAssessmentDrawerOpen ]= useState<boolean>(false);
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
  }, [courses, courseId])

  useEffect(() => {
    if (course) {      
      setCourseAssessments(assessments.filter((assessments) => assessments.courseId == course.id));
    }
  }, [course, courseId])

  const getCourseAssessmentCards = () => {
    let courseAssessmentCards = courseAssessments.map((assessment, index) =>(
      <AssessmentCard key={index} assessment={assessment} />
    ))
    courseAssessmentCards.push(<CreateAssessmentCard key={courses.length} setIsCreateAssessmentDrawerOpen={setIsCreateAssessmentDrawerOpen} />)
    return courseAssessmentCards;
  }

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
            title: 'Courses',
            href: '/courses'
          },
          {
            title: course?.name,
          }
        ]}
      />
      {
        course && (
          <Flex wrap gap="large">
            {getCourseAssessmentCards()}
          </Flex>
        ) 
      }
      <CreateAssessmentDrawer 
        courseId={Number(courseId)}
        isOpen={isCreateAssessmentDrawerOpen} 
        setIsOpen={setIsCreateAssessmentDrawerOpen} 
      />
    </Flex>
  )
}

export default CoursePage