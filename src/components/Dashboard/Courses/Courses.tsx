import React from 'react'
import { Link } from 'react-router-dom';

import {
  Card, 
  List,
  Row, 
  Col,
  Typography,
  theme
} from 'antd';

import { useAppSelector } from '../../../API/hooks';

const { Text } = Typography;

export const Courses: React.FC = () => {
  const { token } = theme.useToken();
  const courses = useAppSelector((state) => state.courses);

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
      title={<Link to='/courses'>Courses</Link>}
      loading={courses.status != 'succeeded'}
    >
      <List
        style={{ 
          width: '100%',
          height: '100%'
        }}
        dataSource={courses.courses}
        renderItem={(course) => (
          <List.Item 
            style={{
              // backgroundColor : course.colour
            }}
          >
            <Row style={{width: "100%"}} gutter={[16, 16]}>
              <Col span={2}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: course.colour,
                    borderRadius: 5
                  }}
                />
              </Col>
              <Col span={22}>
                <Text>{course.name}</Text>
              </Col>
            </Row>
          </List.Item>
          )
        }
      />
    </Card>
  )
}