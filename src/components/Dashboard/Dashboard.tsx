import React, { useEffect } from 'react'

import {
  Flex
} from 'antd';

import { UpcomingAssessments } from './UpcomingAssessments';
import { RecentMarks } from './RecentMarks';
import { Courses } from './Courses';
import { JarJarMeter } from './JarJarMeter';
import { Countdown } from './Countdown';
import { Progress } from './Progress';

import { useAppDispatch, useAppSelector } from '../../API/hooks';
import { fetchAssessments } from '../../API/assessmentsSlice';
import { fetchCourses } from '../../API/coursesSlice'

export const Dashboard: React.FC = () => {
  const session = useAppSelector((state) => state.session.session)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourses(session?.user.id));
    dispatch(fetchAssessments(session?.user.id));
  }, [session]);

  return (
    <Flex>
      <UpcomingAssessments />
      <RecentMarks />
      <Courses />
      <JarJarMeter /> 
      <Countdown />
      <Progress />
    </Flex>
  )
}