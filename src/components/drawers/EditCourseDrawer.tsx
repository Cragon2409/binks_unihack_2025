import { useState } from 'react';

import {
  Drawer,
  Form,
  Row,
  Col,
  Input,
  ColorPicker,
  Button,
} from 'antd';

import { AggregationColor } from 'antd/es/color-picker/color';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { Course } from '../../common/Types';

interface CreateCourseDrawerProps {
  course?: Course 
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCourseDrawer = ({ course, isOpen, setIsOpen } : CreateCourseDrawerProps) => {
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();

  const [name, setName] = useState(''); 
  const [colour, setColour] = useState<AggregationColor>(new AggregationColor('#ffffff'));   
  
  const handleCourseEdit = (courseId: number) => {
    // dispatch(createCourse(courseId))

    if (session) {
      const updatedCourse = {
        userId: session.user.id,
        name: name,
        colour: colour.toHexString()
      }
      // dispatch(updateCourse(course.id, uupdatedCourse));
    }
  }
  
  return (
    <Drawer
      title={`Edit ${course?.name}`}
      open={isOpen} 
      onClose={() => setIsOpen(false)}
    >    
      <Form 
        layout="vertical" 
        onFinish={(handleCourseEdit)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="courseName"
              label="Course Name"
            >
              <Input
                style={{
                  width: '100%'
                }}
                placeholder="Please enter course name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="courseColour"
              label="Course Colour"
            >
              <ColorPicker
                style={{
                  width: '100%'
                }}
                value={colour}
                onChange={(colour: AggregationColor) => setColour(colour)}
                showText={() => 'Course colour'}
              />  
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item>
              <Button 
                style={{
                  width: '100%'
                }}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button 
                style={{
                  width: '100%'
                }}
                type="primary"
                htmlType='submit'
              >
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>
        </Form>
    </Drawer>
  )
}

export default EditCourseDrawer