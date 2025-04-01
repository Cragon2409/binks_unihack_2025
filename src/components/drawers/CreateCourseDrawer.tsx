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
import { createCourse } from '../../API/coursesSlice';

interface CreateCourseDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCourseDrawer = ({ isOpen, setIsOpen } : CreateCourseDrawerProps) => {
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();

  const [name, setName] = useState(''); 
  const [colour, setColour] = useState<AggregationColor>(new AggregationColor('#ffffff'));   
  
  const handleCourseCreate = () => {
    if (session) {
      const course = {
        userId: session.user.id,
        name: name,
        colour: colour.toHexString()
      }
      dispatch(createCourse(course));
    }
  }
  
  return (
    <Drawer
      title="Add a Course"
      open={isOpen} 
      onClose={() => setIsOpen(false)}
    >    
      <Form 
        layout="vertical" 
        requiredMark
        onFinish={(handleCourseCreate)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="courseName"
              label="Course Name"
              rules={[{ required: true, message: 'Please enter course name' }]}
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
              rules={[{ required: true, message: 'Please enter course colour' }]}
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
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
        </Form>
    </Drawer>
  )
}

export default CreateCourseDrawer