import { useNavigate } from 'react-router-dom';

import {
  Card,
  Popconfirm,
  Button,
} from 'antd';

import { 
  DeleteOutlined, 
  EditOutlined 
} from '@ant-design/icons';

import { useAppDispatch } from '../../API/hooks'
import { deleteCourse } from '../../API/coursesSlice';

import { Course } from '../../common/Types';

interface CourseCardProps {
  course: Course;
  setIsEditCourseDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditCourse: React.Dispatch<React.SetStateAction<Course | null>>;
}

const CourseCard = ({ 
  course, 
  setIsEditCourseDrawerOpen, 
  setEditCourse 
} : CourseCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
   
  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
  }

  const handleCourseDelete = () => {
    dispatch(deleteCourse(course.id))
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
      title={course.name}
      extra={
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            backgroundColor: course.colour
          }}
        />
      }
      hoverable
      onClick={handleCourseClick}
      actions={[
        <Button
          type='text'
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            setEditCourse(course);
            setIsEditCourseDrawerOpen(true);
          }}
        />,
        <Popconfirm
          title={`Delete ${course.name}`}
          description='Are you sure you want to delete this course?'
          onConfirm={(e) => {
            e?.stopPropagation();
            handleCourseDelete();
          }}
          okText='Yes'
          cancelText='No'
        >
          <Button
            danger
            type='text'
            icon={<DeleteOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Popconfirm>
      ]}
    />
  )
}

export default CourseCard