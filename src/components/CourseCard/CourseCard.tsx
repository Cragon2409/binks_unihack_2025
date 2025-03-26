import {
  Flex,
  Card,
  Typography
} from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface CourseCardProps {
  course: any;
}

const CourseCard = ({ course } : CourseCardProps) => {
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
            backgroundColor: course.colour_code
          }}
        />
      }
      hoverable
      onClick={() => {}}
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