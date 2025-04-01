import {
  Flex,
  Card,
  Popconfirm,
  Button,
  Tag,
  Space,
  Typography
} from 'antd';

import { 
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined
} from '@ant-design/icons';

import { useAppDispatch } from '../../API/hooks'
import { deleteAssessment } from '../../API/assessmentsSlice';

import { Assessment } from '../../common/Types';

const { Text } = Typography;

interface AssessmentCardProps {
  assessment: Assessment;
  setIsEditAssessmentDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditAssessment: React.Dispatch<React.SetStateAction<Assessment | null>>;
}

const AssessmentCard = ({ 
  assessment, 
  setIsEditAssessmentDrawerOpen, 
  setEditAssessment
} : AssessmentCardProps) => {
  const dispatch = useAppDispatch();
  
  const today = new Date();
  const dueDate = new Date(assessment.dueDate);

  const handleAssessmentDelete = () => {
    dispatch(deleteAssessment(assessment.id))
  }

  const getStatusTag = () => {
    if (assessment.complete) return <Tag color='success'>Complete</Tag>;
    if (today < dueDate) return <Tag color='processing'>In Progress</Tag>;
    return <Tag color='error'>Late</Tag>;
  }
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
          height: '85px',
          padding: '0 24px'
        },
        actions: {
          borderTop: 'none'
        }
      }}
      title={assessment.name} 
      extra={
        <Text strong>{`${assessment.weight}%`}</Text>
      }
      hoverable
      actions={[
        <Button
          type='text'
          icon={<EditOutlined />}
          onClick={() => {
            setEditAssessment(assessment);
            setIsEditAssessmentDrawerOpen(true);
          }} 
        />,
        <Popconfirm
          title={`Delete ${assessment.name}`}
          description='Are you sure you want to delete this assessment?'
          onConfirm={handleAssessmentDelete}
          okText='Yes'
          cancelText='No'
        >
          <Button
            danger
            type='text'
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ]}
    >
      <Flex vertical gap='small'>
        <Flex gap='small' align='center'>
          <Space size='small'>
            <CalendarOutlined />
            <Text type='secondary'>
              {dueDate.toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </Space>
          {
            getStatusTag()
          }
        </Flex>
        <Flex justify='space-between'>
          <Space direction='vertical' size='small'>
            <Text>Desired score</Text>
            <Text>{`${assessment.desiredMark} / 100`}</Text>
          </Space>
          {
            assessment.complete && (
              <Space direction='vertical' size='small'>
                <Text>Actual score</Text>
                <Text>{`${assessment.mark} / 100`}</Text>
              </Space>
            )
          }
        </Flex>
      </Flex>
    </Card>
  )
}

export default AssessmentCard