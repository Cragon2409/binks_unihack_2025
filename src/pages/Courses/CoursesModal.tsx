import { Modal, Input, ColorPicker } from 'antd';
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { createCourse } from '../../API/coursesSlice'
import { useState } from 'react'
import type { ColorPickerProps, GetProp } from 'antd';
type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

interface CourseModalProps {
    courseModalControl: any
    setCourseModalControl: any
  }

export default function CoursesModal(
    { courseModalControl, setCourseModalControl} : CourseModalProps
) {
    const session = useAppSelector(( state ) => state.session.session)
    const dispatch = useAppDispatch();
    const [color, setColor] = useState<Color>('#1677ff');   // For the color picker value
    const [text, setText] = useState(''); 
    const user_id = (session as any)?.user.id

    const handleModalSubmit = () => {
        const course = {user_id : user_id, colour_code : color, name : text}
        dispatch(createCourse(course))
        setCourseModalControl({ open: false });
    }

    // const handleModalCancel = () => {
    //   setCourseModalControl({ open: false });
    // }

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