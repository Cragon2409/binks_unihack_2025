import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import {
  Flex,
  Breadcrumb,
} from 'antd';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'
import { fetchAssessments } from '../../API/assessmentsSlice';

import { Assessment, Course } from '../../common/Types';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard';
import CreateAssessmentCard from '../../components/AssessmentCard/CreateAssessmentCard';
import CreateAssessmentDrawer from '../../components/drawers/CreateAssessmentDrawer';
import EditAssessmentDrawer from '../../components/drawers/EditAssessmentDrawer';

const CoursePage = () => {
  // Extract courseId from the URL
  const { courseId } = useParams(); 
  const navigate = useNavigate();
  const [ course, setCourse ] = useState<Course | null>(null);
  const [ courseAssessments, setCourseAssessments ] = useState<Assessment[]>([]);
  const [ isCreateAssessmentDrawerOpen, setIsCreateAssessmentDrawerOpen ]= useState<boolean>(false);
  const [ isEditAssessmentDrawerOpen, setIsEditAssessmentDrawerOpen ] = useState<boolean>(false);
  const [ editAssessment, setEditAssessment ] = useState<Assessment | null>(null);
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
  }, [courses, courseId, assessments])

  useEffect(() => {
    if (course) {      
      setCourseAssessments(assessments.filter((assessments) => assessments.courseId == course.id));
    }
  }, [course, courseId, assessments])

  const getCourseAssessmentCards = () => {
    let courseAssessmentCards = courseAssessments.map((assessment, index) =>(
      <AssessmentCard 
        key={index} 
        assessment={assessment} 
        setIsEditAssessmentDrawerOpen={setIsEditAssessmentDrawerOpen} 
        setEditAssessment={setEditAssessment} 
      />
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
            title: <Link to='/courses'>Courses</Link>,
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
      {
        editAssessment && (
          <EditAssessmentDrawer
            assessment={editAssessment}
            isOpen={isEditAssessmentDrawerOpen}
            setIsOpen={setIsEditAssessmentDrawerOpen}
          />
        )
      }
      
    </Flex>
  )
}

export default CoursePage