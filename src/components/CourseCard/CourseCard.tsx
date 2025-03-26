import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Card,
  Typography
} from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import { Course } from '../../common/Types';

const { Text } = Typography;

interface CourseCardProps {
  course: Course;
}

// const handleCourseDelete = (courseId: number) => {
//   dispatch(deleteCourse(courseId))
// }

const CourseCard = ({ course } : CourseCardProps) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
  }

  return (
    <Card 
      style={{ 
        minWidth: 250,
        minHeight: 200
      }}
      styles={{
        header: {
          borderBottom: 'none'
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
        <DeleteOutlined onClick={() => {}} />
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