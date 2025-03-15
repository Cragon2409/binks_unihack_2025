
import { Typography, Flex, Modal, Button } from 'antd';
import "./Courses.css"
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'
import { useEffect, useState } from 'react'
import CoursesModal from './CoursesModal';


const { Title } = Typography;


export default function Courses() {
  const courses = useAppSelector(( state ) => state.courses.courses)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();
  const [courseModalControl, setCourseModalControl] = useState({open : false})

  useEffect(() => {
    dispatch(fetchCourses((session as any)?.user.id));
  }, [session]);

  const [courses, setCourses] = useState<string[]>([]);
  const [isCourseInfoModalOpen, setIsCourseInfoModalOpen] = useState(false);
  const [isCourseAddModalOpen, setIsCourseAddModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const showCourseInfoModal = (course: string) => {
    setSelectedCourse(course);
    setIsCourseInfoModalOpen(true);
  };

  const showCourseAddModal = () => {
    setIsCourseAddModalOpen(true);
  };

  const handleCourseInfoOk = () => {
    setIsCourseInfoModalOpen(false);
  };

  const handleCourseInfoCancel = () => {
    setIsCourseInfoModalOpen(false);
  };

  const handleCourseAddOk = () => {
    setIsCourseAddModalOpen(false);
    setCourses([...courses, "Course Name"]);
  };

  const handleCourseAddCancel = () => {
    setIsCourseAddModalOpen(false);
  };

  return (
    <>
      <Flex gap="small" align="center">
        <Title>Courses</Title>
        <Button onClick={() => showCourseAddModal()}> Add Course </Button>
      </Flex>
      <div className="course-container">
        <Flex wrap gap="small">
          {courses.map((course, index) => (
            <Button onClick={() => showCourseInfoModal(course)} key={index}> {course} </Button>
          ))}
            <Button  onClick={() => showCourseInfoModal("Placeholder")}> Woah a Course </Button>
        </Flex>

        <Modal 
          title="Add Course Modal" 
          open={isCourseAddModalOpen} 
          onOk={handleCourseAddOk} 
          onCancel={handleCourseAddCancel}
          >
          <p>Assessments</p>
        </Modal>
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