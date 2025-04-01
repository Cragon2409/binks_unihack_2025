import { useState, useEffect } from 'react';

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

import { useAppDispatch, useAppSelector } from '../../API/hooks';
import { updateCourse } from '../../API/coursesSlice';
import { Course } from '../../common/Types';

interface EditCourseDrawerProps {
  course: Course 
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCourseDrawer = ({ course, isOpen, setIsOpen } : EditCourseDrawerProps) => {
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();

  const [name, setName] = useState(''); 
  const [colour, setColour] = useState<AggregationColor>(new AggregationColor('#ffffff'));   

  const [ form ] = Form.useForm();
  
  useEffect(() => {
      if (course) {
        setName(course.name);
        setColour(new AggregationColor(course.colour));
  
        form.setFieldsValue({
          name: course.name,
          colour: new AggregationColor(course.colour)
        });
      }
    }, [course, form])

  const handleCourseEdit = () => {
    if (session) {
      const updatedCourse = {
        id: course.id,
        userId: session.user.id,
        createdAt: course.createdAt,
        name: name,
        colour: colour.toHexString()
      }
      dispatch(updateCourse({
        id: course.id,
        course: updatedCourse
      }));
    }
  }
  
  return (
    <Drawer
      title={`Edit ${course?.name}`}
      open={isOpen} 
      onClose={() => setIsOpen(false)}
    >    
      <Form 
        form={form}
        layout="vertical" 
        onFinish={(handleCourseEdit)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='name'
              valuePropName='value'
              label="Course Name"
            >
              <Input
                style={{
                  width: '100%'
                }}
                placeholder='Please enter course name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='colour'
              valuePropName='value'
              label='Course Colour'
            >
              <ColorPicker
                style={{
                  width: '100%'
                }}
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