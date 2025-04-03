import React from 'react'
import { Link } from 'react-router-dom';

import {
  Card,
  List,
  Row,
  Col,
  Typography,
  Checkbox,
  theme
} from 'antd';

import { useAppSelector } from '../../../API/hooks';
import { Assessment } from '../../../common/Types';

const { Text } = Typography;

const WEEKDAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
]

export const UpcomingAssessments: React.FC = () => {
  const { token } = theme.useToken();
    const assessments = useAppSelector((state) => state.assessments);
    const courses = useAppSelector((state) => state.courses);

  const currentDate = new Date().toISOString();

  const  getFormatFromISO = (isoDate : string) => {
    const dateObj = new Date(isoDate)
    const mins = dateObj.getUTCMinutes()
    return dateObj.getUTCHours() + ':' + ((mins < 10) ? ('0' + mins) : (mins))  + ", " + WEEKDAYS[dateObj.getUTCDay()] + ' ' + dateObj.getUTCDate() + '/' + (dateObj.getUTCMonth() + 1)
  }

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
      title='Upcoming Assessments'
      loading={assessments.status != 'succeeded' && courses.status != 'succeeded'}
    >
      <List
        bordered={false}
        dataSource={assessments.assessments.filter((item : Assessment) => item.dueDate.localeCompare(currentDate))}
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
                  <Col span={7}>
                    <Text>{item.name}</Text> 
                  </Col>
                  <Col span={7}>
                    <Text>{getFormatFromISO(item.dueDate)}</Text>
                  </Col>
                  <Col span={7}>
                    <Checkbox defaultChecked={(item.complete)} />
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