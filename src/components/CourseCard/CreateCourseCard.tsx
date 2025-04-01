import {
  Card,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';

interface CreateCourseCardProps {
  setIsCreateCourseDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCourseCard = ({ setIsCreateCourseDrawerOpen } : CreateCourseCardProps) => {
  return (
    <Card 
      style={{ 
        minWidth: 250,
        height: 200,
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
      onClick={() => setIsCreateCourseDrawerOpen(true)}
    >
      <PlusOutlined />
    </Card>
  )
}

export default CreateCourseCard