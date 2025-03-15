import { Typography, Button, Modal, Input, ColorPicker } from 'antd';
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { fetchCourses } from '../../API/coursesSlice'
import { useEffect, useState } from 'react'
import type { ColorPickerProps, GetProp } from 'antd';
type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

interface CourseModalProps {
    courseModalControl: any
    setCourseModalControl: any
  }

export default function CoursesModal(
    { courseModalControl, setCourseModalControl} : CourseModalProps
) {
    const [color, setColor] = useState<Color>('#1677ff');   // For the color picker value
    const [text, setText] = useState(''); 

    const handleModalSubmit = () => {
        //jazz TODO
        setCourseModalControl({ open: false });
    }

    return (
    <>
      <Modal title="Add a Course" 
            open={courseModalControl.open} 
            onOk={handleModalSubmit} 
            onCancel={handleModalSubmit}>
        <Input
            placeholder="Enter course name"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <ColorPicker
            value={color}
            onChange={(value) => setColor(value!.toHexString())}
            style={{ width: '100%' }}
          />
      </Modal>
    </>
  );
    
}
