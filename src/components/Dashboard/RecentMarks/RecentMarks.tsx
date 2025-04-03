import React from 'react';

import {
  Card,
  List,
  Row,
  Col,
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
    <Card 
      style={{ 
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        boxShadow: token.boxShadow
      }}
      styles={{
        header: {
          borderBottom: 'none'
        },
        body: {
          paddingTop: 0,
        }
      }}
      variant='borderless'
      title='Recent Marks'
      loading={assessments.status != 'succeeded' || assessments.status != 'succeeded'}
    >
      <List
        style={{ 
          width: '100%',
          height: '100%'
        }}
        dataSource={assessments.assessments.filter((item : Assessment) => item.dueDate.localeCompare(currentDate) && item.complete).slice().reverse()}
        renderItem={(item : any) => {
          const course = courses.courses.find((course) => course.id == item.courseId);
          return (
            <List.Item>
              <Row style={{width: "100%"}} gutter={[16, 16]}>
                <Col span={1}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: course?.colour,
                      borderRadius: 5
                    }}
                  />
                </Col>
                <Col span={5}>
                  <Text>{`${course?.name}`}</Text> 
                </Col>
                <Col span={5}>
                  <Text>{`${item.name}`}</Text> 
                </Col>
                <Col span={5}>
                    <Text>Actual Mark: </Text>
                    <Text 
                      type={(item.mark >= item.desiredMark) ? 'success' : 'danger'}
                    >
                      {`${item.mark} / 100`}
                    </Text> 
                </Col>
                <Col span={5}>
                    <Text>{`Desired Mark: ${item.desiredMark} / 100`}</Text>
                </Col>
            </Row>
            </List.Item>
          )
        }
        }
      />
    </Card>
  )
}