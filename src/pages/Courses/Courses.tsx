
import { Typography, Flex, Modal, Card } from 'antd';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { deleteCourse, fetchCourses } from '../../API/coursesSlice'
import { useEffect, useState } from 'react'
import CoursesModal from '../../components/Courses/CoursesModal';
import Assessment from '../../components/Assessments/Assessments';

import CourseCard from '../../components/CourseCard/CourseCard';
import AddCourseCard from '../../components/CourseCard/AddCourseCard';

import * as Constants from '../../common/Constants'

const { Title } = Typography;

export default function Courses() {
  const courses = useAppSelector(( state ) => state.courses.courses)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();
  const [courseModalControl, setCourseModalControl] = useState({open : false})
  const [assessmentModalControl, setAssessmentModalControl] = useState({open : false, editMode : false, row : null})
  


  useEffect(() => {
    dispatch(fetchCourses((session as any)?.user.id));
  }, [session]);

  const [isCourseInfoModalOpen, setIsCourseInfoModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const showCourseInfoModal = ( course: any ) => {
    setSelectedCourse(course);
    setIsCourseInfoModalOpen(true);
  };

  const handleCourseInfoOk = () => {
    setIsCourseInfoModalOpen(false);
  };

  const handleCourseInfoCancel = () => {
    setIsCourseInfoModalOpen(false);
  };

  const handleCourseDelete = (courseId: number) => {
    dispatch(deleteCourse(courseId))
  }

  const getCourseCards = () => {
    let cards = courses.map((course, index) => (
      <CourseCard key={index} course={course} />
    ))
    cards.push(<AddCourseCard />)
    return cards
  }
  
  return (
    <>
      <Title>Courses</Title>
      <div className="course-container">
        <Flex wrap gap="large">
        {getCourseCards()}
        </Flex>

        <CoursesModal
          courseModalControl={courseModalControl}
          setCourseModalControl={setCourseModalControl}
          />
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
      </div>
    </>
  )
}