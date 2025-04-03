import React, { useEffect } from 'react'

import {
  Flex,
  Row,
  Col
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
    <Flex vertical gap='large'>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <UpcomingAssessments />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <RecentMarks />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Courses />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Progress />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Countdown />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <JarJarMeter /> 
        </Col>
      </Row>
    </Flex>
  )
}