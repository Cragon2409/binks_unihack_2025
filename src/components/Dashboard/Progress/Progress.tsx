import React from 'react'

import {
  Card,
  Progress as AntProgress,
  Flex,
  Typography,
  theme
} from 'antd';

import { useAppSelector } from '../../../API/hooks';

const { Text } = Typography;

export const Progress: React.FC = () => {
  const { token } = theme.useToken();
  const assessments = useAppSelector((state) => state.assessments);

  const numberOfAssessments = assessments.assessments.length;
  const numberOfRemainingAssessments = assessments.assessments.filter((assessment) => assessment.complete).length;
  const assessmentProgress = Math.round(100 - (numberOfRemainingAssessments / numberOfAssessments));

  return (
    <Card 
      style={{ 
        height: '100%', 
        justifyContent: 'center', 
        backgroundColor : token.colorBgBase 
      }}
      title='Progress'  
      loading={assessments.status != 'succeeded'}
    >
      <Flex justify='center' vertical={true} align='center'>
        <AntProgress type='circle' percent={assessmentProgress} />
        <Text>
          {
            (assessmentProgress == 100) 
              ? 'All Assignments Done!'
              : `${numberOfRemainingAssessments} Assessment ${numberOfRemainingAssessments != 1 ? 's' : ""} Remaining` 
          }
        </Text>
      </Flex>
    </Card>
  )
}