import {
  Flex,
  Card,
  Button,
  Typography
} from 'antd';

import { 
  EditOutlined,
  DeleteOutlined 
} from '@ant-design/icons';

import { Assessment } from '../../common/Types';

const { Text } = Typography;

interface AssessmentCardProps {
  assessment: Assessment;
}

const AssessmentCard = ({ assessment } : AssessmentCardProps) => {
  return (
    <Card 
      style={{
        minWidth: 250,
        height: 300
      }}
      title={assessment?.name ? assessment.name : 'Unknown'} 
      hoverable
    >
      <Flex vertical gap='small'>
        <Text>{`Due date: ${assessment.dueDate !== null ? new Date(assessment.dueDate).toDateString() : ""}`}</Text>
        <Text>{`Completed date: ${assessment.completeDate !== null ? new Date(assessment.completeDate).toDateString() : ""}`}</Text>
        <Text>{`Weight: ${assessment.weight}`}</Text>
        <Text>{`Target marks: ${assessment.goalMark}`}</Text>
        <Text>{`Marks: ${assessment.mark}`}</Text>
        <Text>{`Completed?: ${assessment.complete ? "Yes" : "No"}`}</Text>
        <Flex gap='small'>
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => {}} 
            danger 
          />
          <Button
            icon={<EditOutlined />} 
            onClick={() => {}} 
          />
        </Flex>
      </Flex>
    </Card>
  )
}

export default AssessmentCard