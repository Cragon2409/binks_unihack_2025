import React from 'react'

import {
  List,
  Flex,
  Typography,
  theme
} from 'antd';

import { useAppSelector } from '../../../API/hooks';
import { Assessment } from '../../../common/Types';

const { Text } = Typography;

export const RecentMarks: React.FC = () => {
  const { token } = theme.useToken();
  const assessments = useAppSelector((state) => state.assessments);
  const courses = useAppSelector((state) => state.courses);

  const currentDate = new Date().toISOString();

  return (
    <List
      style={{ 
        height: "20vh", 
        backgroundColor : token.colorBgBase, 
        overflow: "auto"
      }}
      loading={assessments.status != 'succeeded' || assessments.status != 'succeeded'}
      bordered
      header={<Text>Recent Marks</Text>}
      dataSource={assessments.assessments.filter((item : Assessment) => item.dueDate.localeCompare(currentDate) && item.complete).slice().reverse()}
      
      renderItem={(item : any) => {
        const course = courses.courses.find((course) => course.id == item.courseId);
        return (
          <List.Item>
            <Flex gap="small" align="center">
              <Text style={{backgroundColor : course?.colour}}>[{course?.name}]</Text> 
              <Text style={{color : (item.mark >= item.goal_mark) ? "green" : "red"}}>{item.mark}</Text> ( Goal: {item.goal_mark} )
            </Flex>
          </List.Item>
        )
      }
      }
    />
  )
}