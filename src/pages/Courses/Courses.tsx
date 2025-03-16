
import { Typography, Flex, Modal, Button, Space } from 'antd';
import "./Courses.css"
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { deleteCourse, fetchCourses } from '../../API/coursesSlice'
import { useEffect, useState } from 'react'
import CoursesModal from './CoursesModal';
import Assessment from './Assessments';
import { DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';



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
      <Space key={index} direction="horizontal" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Button 
        className="course-button"
        style={{ 
          border: `2px solid ${course.colour_code}`
        }}
        onClick={() => showCourseInfoModal(course)}
      > 
        {course.name}
        <div 
          style={{
            position: "absolute", 
            bottom: "5px", 
            right: "5px", 
            display: "flex", 
            gap: "5px"
          }}
        >
          <Button 
            icon={<DeleteOutlined />} 
            onClick={(e) => { e.stopPropagation(); handleCourseDelete(course.id); }} 
            danger 
            size="small"
          />
        </div>
      </Button>
    </Space>
    ))
    const createCardButton = (
      <Space key={cards.length} direction="horizontal" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Button 
          className="course-button"
          onClick={() => setCourseModalControl({open: true})}
        > 
          <PlusOutlined style={{ fontSize: "30px" }} />
        </Button>
      </Space>)
    cards.push(createCardButton)
    return cards
  }
  

  return (
    <>
      <Flex gap="small" align="center">
        <Title>Courses</Title>
      </Flex>
      <div className="course-container">
        <Flex wrap gap="small">
        {getCourseCards()}
        </Flex>

        <CoursesModal
          courseModalControl={courseModalControl}
          setCourseModalControl={setCourseModalControl}
          />
        <Modal 
          title={selectedCourse ? selectedCourse.name : "Course Information"}
          open={isCourseInfoModalOpen} 
          onOk={handleCourseInfoOk} 
          onCancel={handleCourseInfoCancel}
          width={"100%"}
          wrapClassName="course-info-modal"
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

