
import { Typography, Flex, Modal, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { deleteCourse, fetchCourses } from '../../API/coursesSlice'
import { useEffect, useState } from 'react'
import CoursesModal from '../../components/Courses/CoursesModal';
import Assessment from '../../components/Assessments/Assessments';
import * as Constants from '../../common/Constants'

const { Title, Text } = Typography;

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
      <Card 
        key={index} 
        style={{ 
          minWidth: 250,
          height: 150,
        }}
        hoverable
        onClick={() => showCourseInfoModal(course)}
        actions={[
          <DeleteOutlined style={{ fontSize: "20px" }} key="delete" onClick={(e) => { e.stopPropagation(); handleCourseDelete(course.id); }} />
        ]}
      >
        <Card.Meta
          title={<Text style={{color: course.colour_code}}>{course.name}</Text>}
        />
      </Card>
    ))
    const createCardButton = (
      <Card 
        style={{ 
          minWidth: 250,
          height: 150,
          alignItems: 'center',
          textAlign: 'center'
        }}
        hoverable
        onClick={() => setCourseModalControl({open: true})}
        actions={[
          <PlusOutlined style={{ fontSize: "20px" }} />
        ]}
      >
        <Card.Meta
          title='Add course'
        />
      </Card>
    )
    cards.push(createCardButton)
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