import React from 'react'

import {
  Card, 
  Typography,
  theme
} from 'antd';

import { useAppSelector } from '../../../API/hooks';
import { Assessment } from '../../../common/Types';

const { Text } = Typography;

export const Countdown: React.FC = () => {
  const { token } = theme.useToken();
  const assessments = useAppSelector((state) => state.assessments);

  const getLatestDay = () => {
    const currentDate = new Date().toISOString();

    // Filter out past and completed assessments
    const incompleteAssessments = assessments.assessments.filter((item : any) => item.complete == false && item.dueDate.localeCompare(currentDate)); 
  
    if (incompleteAssessments.length === 0) {
      return 0;
    }

    const latestItem = new Date(incompleteAssessments.reduce((latest : Assessment, current : Assessment) => latest.dueDate.localeCompare(current.dueDate) ? latest : current ).dueDate)
    const timeDifference = latestItem.getTime() - (new Date()).getTime()
  
    return Math.ceil(timeDifference / (1000 * 3600 * 24))
  }

  const countdownDays = getLatestDay();

  return (
    <Card 
      style={{ 
        width: '100%',
        height: '100%',
        boxShadow: token.boxShadow
      }}
      styles={{
        header: {
          borderBottom: 'none'
        },
        body: {
          paddingTop: 0
        }
      }}
      variant='borderless'
      title="Countdown" 
      loading={assessments.status != 'succeeded'}
    >
      {
        countdownDays == 0 
          ? <Text>No upcoming assessments</Text>
          : <Text>{`${countdownDays} days until next assessment is due`}</Text>
      }
    </Card>
  )
}