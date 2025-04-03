import React from 'react'
import { Link } from 'react-router-dom';

import { 
  List,
  theme
} from 'antd';

import { useAppSelector } from '../../../API/hooks';

export const Courses: React.FC = () => {
  const { token } = theme.useToken();
  const courses = useAppSelector((state) => state.courses);

  return (
    <List
      style={{ height: "20vh", backgroundColor : token.colorBgBase,  overflow: "auto"}}
      header={<Link to='/courses'>Courses</Link>}
      bordered
      loading={courses.status != 'succeeded'}
      dataSource={courses.courses}
      renderItem={(course) => (
        <List.Item style={{backgroundColor : course.colour}}>
          {course.name}
        </List.Item>
        )
      }
    />
  )
}