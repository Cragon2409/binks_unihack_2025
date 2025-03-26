import {
  Flex,
  Card,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';

interface AddCourseCardProps {
}

const AddCourseCard = ({ } : AddCourseCardProps) => {
  return (
    <Card 
      style={{ 
        minWidth: 250,
        minHeight: 200,
        borderStyle: 'dashed'
      }}
      styles={{
        body: {
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }}
      hoverable
      onClick={() => {}}
    >
      <PlusOutlined />
    </Card>
  )
}

export default AddCourseCard