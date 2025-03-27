import { useEffect, useState } from 'react'

import { 
  Typography, 
  Flex
} from 'antd';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'

import CourseCard from '../../components/CourseCard/CourseCard';
import CreateCourseCard from '../../components/CourseCard/CreateCourseCard';
import CreateCourseDrawer from '../../components/drawers/CreateCourseDrawer';

const { Title } = Typography;

export default function CoursesPage() {
  const courses = useAppSelector(( state ) => state.courses.courses)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();

  const [isCreateCourseDrawerOpen, setIsCreateCourseDrawerOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (session) {
      dispatch(fetchCourses(session.user.id));
    }
  }, [session]);

  const getCourseCards = () => {
    let cards = courses.map((course, index) => (
      <CourseCard key={index} course={course} />
    ))
    cards.push(<CreateCourseCard key={courses.length} setIsCreateCourseDrawerOpen={setIsCreateCourseDrawerOpen} />)
    return cards
  }
  
  return (
    <Flex vertical>
      <Title>Courses</Title>
      <Flex wrap gap="large">
        {getCourseCards()}
      </Flex>
      <CreateCourseDrawer isOpen={isCreateCourseDrawerOpen} setIsOpen={setIsCreateCourseDrawerOpen} />
    </Flex>
  )
}