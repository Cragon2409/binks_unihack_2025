import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Card,
  Button,
  Typography
} from 'antd';

import { 
  DeleteOutlined, 
  EditOutlined 
} from '@ant-design/icons';

import { Course } from '../../common/Types';

const { Text } = Typography;

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course } : CourseCardProps) => {
  const navigate = useNavigate();
   
  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
  }

  // const handleCourseDelete = (courseId: number) => {
  //   dispatch(deleteCourse(courseId))
  // }

  return (
    <Card 
      style={{ 
        minWidth: 250,
        height: 200
      }}
      styles={{
        header: {
          borderBottom: 'none'
        },
        body: {
          padding: '0 24px'
        },
        actions: {
          borderTop: 'none'
        }
      }}
      title={course.name}
      extra={
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            backgroundColor: course.colour
          }}
        />
      }
      hoverable
      onClick={handleCourseClick}
      actions={[
        <Button
          type='text'
          icon={<EditOutlined />}
          onClick={() => {}} 
        />,
        <Button
          danger
          type='text'
          icon={<DeleteOutlined />}
          onClick={() => {}}
        />
      ]}
    >
      <Flex vertical>
        <Text>Course Code</Text>
        <Text>Current Scoree</Text>
        <Text>Desired Mark</Text>
      </Flex>
    </Card>
  )
}

export default CourseCard