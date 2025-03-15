import { useState } from "react";
import { Typography, Button, Flex } from 'antd';


const { Title } = Typography;

const courseButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

export default function Courses() {
  const [courses, setCourses] = useState<string[]>([]);
  const addCourse = () => {
    setCourses([...courses, "Course Name"]);
  };
  const openCourse = () => {
    
  }

  return (
    <>
      <Flex gap="small" align="center">
        <Title>Courses</Title>
        <Button onClick={addCourse}> Add Course </Button>
      </Flex>
      <div className="course-container">
        <Flex wrap gap="small">
          {courses.map((course, index) => (
            <Button style={courseButtonStyle} key={index}> {course} </Button>
          ))}
            <Button style={courseButtonStyle} onClick={openCourse}> Woah a Course </Button>
        </Flex>
      </div>
    </>
  )
}