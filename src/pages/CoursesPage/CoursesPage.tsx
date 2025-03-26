
import { Typography, Flex, Modal, Card } from 'antd';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { deleteCourse, fetchCourses } from '../../API/coursesSlice'
import { useEffect, useState } from 'react'

import CourseCard from '../../components/CourseCard/CourseCard';
import CreateCourseCard from '../../components/CourseCard/CreateCourseCard';
import CreateCourseDrawer from '../../components/CreateCourseDrawer/CreateCourseDrawer';
import Assessment from '../../components/Assessments/Assessments';

import * as Constants from '../../common/Constants'

const { Title } = Typography;

export default function CoursesPage() {
  const courses = useAppSelector(( state ) => state.courses.courses)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();

  const [assessmentModalControl, setAssessmentModalControl] = useState({open : false, editMode : false, row : null})

  const [isCreateCourseDrawerOpen, setIsCreateCourseDrawerOpen] = useState<boolean>(false);
  
  useEffect(() => {
    dispatch(fetchCourses((session as any)?.user.id));
  }, [session]);

  const [isCourseInfoModalOpen, setIsCourseInfoModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleCourseInfoOk = () => {
    setIsCourseInfoModalOpen(false);
  };

  const handleCourseInfoCancel = () => {
    setIsCourseInfoModalOpen(false);
  };

  const getCourseCards = () => {
    let cards = courses.map((course, index) => (
      <CourseCard key={index} course={course} />
    ))
    cards.push(<CreateCourseCard key={courses.length} setIsCreateCourseDrawerOpen={setIsCreateCourseDrawerOpen} />)
    return cards
  }
  
  return (
    <Flex vertical>
      <Title>Courses</Title>
      <Flex wrap gap="large">
        {getCourseCards()}
      </Flex>

      <Modal 
        title={selectedCourse ? selectedCourse.name + " assessments" : "Course Information"}
        open={isCourseInfoModalOpen} 
        onOk={handleCourseInfoOk} 
        onCancel={handleCourseInfoCancel}
        width={Constants.maxWidth + 50}
      >
        <Assessment 
          course={selectedCourse}
          assessmentModalControl={assessmentModalControl}
          setAssessmentModalControl={setAssessmentModalControl}
        />
      </Modal>
      <CreateCourseDrawer isOpen={isCreateCourseDrawerOpen} setIsOpen={setIsCreateCourseDrawerOpen} />
    </Flex>
  )
}