import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { 
  Layout,
  Menu,
  theme
} from 'antd';

import type { MenuProps } from 'antd';

import {
  HomeOutlined,
  ReadOutlined,
  CalendarOutlined
} from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'

const { Sider } = Layout;

export default function VerticalNavigationBar() {
  const { token: { colorBorder } } = theme.useToken();
  const [collapsed, setCollapsed] = useState(true);
  const courses = useAppSelector(( state ) => state.courses.courses);
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      dispatch(fetchCourses(session.user.id));
    }
  }, [session]);

  const handleNavigate = (dst: string) => {
    navigate(dst);
    setCollapsed(true);
  }

  const items: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      onClick: () => handleNavigate('/')
    },
    {
      key: 'courses',
      icon: <ReadOutlined />,
      label: 'Courses',
      onTitleClick: () => navigate('courses'),
      children: (
        courses.map((course) => (
          {
            key: course.id,
            label: course.name,
            onClick: () => handleNavigate(`/courses/${course.id}`)
          }
        ))
      )
    },
    {
      key: 'timetable',
      icon: <CalendarOutlined />,
      label: 'Timetable',
      onClick: () => handleNavigate('timetable')
    }
  ]

  return (
    <Sider
      style={{
        overflow: 'auto',
        position: 'fixed',
        zIndex: 1000,
        height: '100vh',
        insetInlineStart: 0,
        top: 81,
        bottom: 0,
        padding: 0,
        margin: 0,
        borderRight: `1px solid ${colorBorder}`,
      }} 
      theme='light' 
      breakpoint='lg'
      collapsedWidth={75} 
      width={300} 
      collapsed={collapsed} 
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <Menu 
        style={{ 
          border: 'none' 
        }} 
        items={items}
        mode="inline" 
        theme="light" 
        defaultSelectedKeys={['home']}
      />
    </Sider>
  )
}