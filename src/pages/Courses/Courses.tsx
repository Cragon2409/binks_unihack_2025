
import { Typography, Flex, Modal, Button } from 'antd';
import "./Courses.css"
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'
import { useEffect, useState } from 'react'
import CoursesModal from './CoursesModal';


const { Title } = Typography;


export default function Courses() {
  //const courses = useAppSelector(( state ) => state.courses.courses)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();
  const [courseModalControl, setCourseModalControl] = useState({open : false})

  useEffect(() => {
    dispatch(fetchCourses((session as any)?.user.id));
  }, [session]);

  const [isCourseInfoModalOpen, setIsCourseInfoModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const showCourseInfoModal = (course: string) => {
    setSelectedCourse(course);
    setIsCourseInfoModalOpen(true);
  };

  const handleCourseInfoOk = () => {
    setIsCourseInfoModalOpen(false);
  };

  const handleCourseInfoCancel = () => {
    setIsCourseInfoModalOpen(false);
  };


  return (
    <>
      <Flex gap="small" align="center">
        <Title>Courses</Title>
        <Button onClick={() => setCourseModalControl({open: true})}> Add Course </Button>
      </Flex>
      <div className="course-container">
        <Flex wrap gap="small">
            <Button  onClick={() => showCourseInfoModal("Placeholder")}> Woah a Course </Button>
        </Flex>

        <CoursesModal
          courseModalControl={courseModalControl}
          setCourseModalControl={setCourseModalControl}
          />
        <Modal 
          title={selectedCourse || "Course Information"} 
          open={isCourseInfoModalOpen} 
          onOk={handleCourseInfoOk} 
          onCancel={handleCourseInfoCancel}
          width={"100%"}
          wrapClassName="course-info-modal"
          >
            <p>Assessments</p>
            <p>No assessments available for this course.</p>
            <p>Grades</p> 
        </Modal>
      </div>
    </>
  )
}