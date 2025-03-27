import { useState } from 'react';

import {
  Drawer,
  Form,
  Row,
  Col,
  Input,
  ColorPicker,
  Button,
  Space
} from 'antd';

import { AggregationColor } from 'antd/es/color-picker/color';

interface CreateCourseDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCourseDrawer = ({ isOpen, setIsOpen } : CreateCourseDrawerProps) => {
  const [text, setText] = useState(''); 
  const [colour, setColour] = useState<AggregationColor>(new AggregationColor('#ffffff'));   

  // const handleCourseCreate = (courseId: number) => {
  //   dispatch(createCourse(courseId))
  // }
  
  return (
    <Drawer
      title="Add a Course"
      open={isOpen} 
      onClose={() => setIsOpen(false)}
    >    
      <Form layout="vertical" requiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="courseName"
              label="Course Name"
              rules={[{ required: true, message: 'Please enter course name' }]}
            >
              <Input
                placeholder="Please enter course name"
                value={text}
                onChange={(e) => setText(e.target.value)}
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
                value={colour}
                onChange={(colour: AggregationColor) => setColour(colour)}
                showText={() => 'Course colour'}
              />  
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col span={24}>
            <Form.Item>
              <Space size='large'>
                <Button 
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="primary"
                  onClick={() => {}} // TODO: Finish 
                >
                  Create
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
        </Form>
    </Drawer>
  )
}

export default CreateCourseDrawer