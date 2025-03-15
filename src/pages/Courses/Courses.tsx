import { Typography, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'
import { useEffect, useState } from 'react'
import CoursesModal from './CoursesModal';


const { Title } = Typography;

export default function Courses() {
  const courses = useAppSelector(( state ) => state.courses.courses)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();
  const [courseModalControl, setCourseModalControl] = useState({open : false})

  useEffect(() => {
    dispatch(fetchCourses((session as any)?.user.id));
  }, [session]);

  return (
    <div>
      <Title>Courses</Title>
      <button onClick={() => {setCourseModalControl({ open: true });} }>Sign Out</button>
      <CoursesModal 
        courseModalControl={courseModalControl} 
        setCourseModalControl={setCourseModalControl} 
        courses={courses} 
      />
    </div>
    
  );
}