import { useState } from "react";
import { Typography, Button, Flex, Modal } from 'antd';
import "./Courses.css"

const { Title } = Typography;

const courseInfoButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};



export default function Courses() {
  const [courses, setCourses] = useState<string[]>([]);
  const [isCourseInfoModalOpen, setIsCourseInfoModalOpen] = useState(false);
  const [isCourseAddModalOpen, setIsCourseAddModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const addCourse = () => {
    showCourseAddModal()
  };

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
        <Button onClick={addCourse}> Add Course </Button>
      </Flex>
      <div className="course-container">
        <Flex wrap gap="small">
          {courses.map((course, index) => (
            <Button style={courseInfoButtonStyle} onClick={() => showCourseInfoModal(course)} key={index}> {course} </Button>
          ))}
            <Button style={courseInfoButtonStyle} onClick={() => showCourseInfoModal("Placeholder")}> Woah a Course </Button>
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
          <p>Grades</p>
        </Modal>
      </div>
    </>
  )
}