import {
  Card,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';

interface CreateAssessmentCardProps {
  setIsCreateAssessmentDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAssessmentCard = ({ setIsCreateAssessmentDrawerOpen } : CreateAssessmentCardProps) => {
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
      onClick={() => setIsCreateAssessmentDrawerOpen(true)}
    >
      <PlusOutlined />
    </Card>
  )
}

export default CreateAssessmentCard