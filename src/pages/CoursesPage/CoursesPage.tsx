import { useEffect, useState } from 'react'

import { 
  Breadcrumb, 
  Flex
} from 'antd';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'

import CourseCard from '../../components/CourseCard/CourseCard';
import CreateCourseCard from '../../components/CourseCard/CreateCourseCard';
import CreateCourseDrawer from '../../components/drawers/CreateCourseDrawer';
import EditCourseDrawer from '../../components/drawers/EditCourseDrawer';

import { Course } from '../../common/Types';

export default function CoursesPage() {
  const courses = useAppSelector(( state ) => state.courses.courses);
  const session = useAppSelector(( state ) => state.session.session);
  const dispatch = useAppDispatch();

  const [isCreateCourseDrawerOpen, setIsCreateCourseDrawerOpen] = useState<boolean>(false);
  const [isEditCourseDrawerOpen, setIsEditCourseDrawerOpen] = useState<boolean>(false);
  const [editCourse, setEditCourse ] = useState<Course | null>(null);
  
  useEffect(() => {
    if (session) {
      dispatch(fetchCourses(session.user.id));
    }
  }, [session, isEditCourseDrawerOpen, isCreateCourseDrawerOpen]);

  const getCourseCards = () => {
    let cards = courses.map((course, index) => (
      <CourseCard 
        key={index} 
        course={course} 
        setIsEditCourseDrawerOpen={setIsEditCourseDrawerOpen} 
        setEditCourse={setEditCourse }
      />
    ))
    cards.push(<CreateCourseCard key={courses.length} setIsCreateCourseDrawerOpen={setIsCreateCourseDrawerOpen} />)
    return cards
  }
  
  return (
    <Flex 
      style={{
        padding: 24
      }}
      vertical
      gap='large'
    >
      <Breadcrumb
          items={[
            {
              title: 'Courses',
            }
          ]}
        />
      <Flex wrap gap="large">
        {getCourseCards()}
      </Flex>
      <CreateCourseDrawer isOpen={isCreateCourseDrawerOpen} setIsOpen={setIsCreateCourseDrawerOpen} />
      {
        editCourse && <EditCourseDrawer course={editCourse} isOpen={isEditCourseDrawerOpen} setIsOpen={setIsEditCourseDrawerOpen} />
      }
    </Flex>
  )
}