import { Modal, Input, Form, InputNumber, Checkbox, DatePicker, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { createAssessment } from '../../API/assessmentsSlice';
import { useState } from 'react'
import type { DatePickerProps } from 'antd';

interface AssModalProps {
    assModalControl: any
    setAssModalControl: any
    courseId: number
  }

export default function AssessmentsModal(
    { assModalControl, setAssModalControl, courseId} : AssModalProps
) {
    const session = useAppSelector(( state ) => state.session.session)
    const dispatch = useAppDispatch();
    const [name, setName] = useState(''); 
    const [dueDate, setDueDate] = useState(''); 
    const [weight, setWeight] = useState<number | null>(null); 
    const [goal, setGoal] = useState<number | null>(null); 
    const [grade, setGrade] = useState<number | null>(null);
    const [complete, setComplete] = useState(false)
    const user_id = (session as any)?.user.id

    const handleDateChange: DatePickerProps['onOk'] = (value) => {
        if (value) {
            setDueDate(value.toISOString()); // Convert moment object to a string
        }
    };

    const handleWeightChange = (value: number | null) => {
        setWeight(value ? value : null);
    };

    const handleGoalChange = (value: number | null) => {
        setGoal(value ? value : null);
    };

    const handleGradeChange = (value: number | null) => {
        setGrade(value ? value : null);
    };

    const handleModalSubmit = () => {
        const assessment = {
            user_id : user_id,
            course_id: courseId,
            name: name,
            due_date: dueDate,
            weight: weight,
            goal_mark: goal,
            mark: grade,
            complete: complete
         }
        dispatch(createAssessment(assessment))
        setAssModalControl({ open: false });
    }

    return (
    <>
      <Modal title="Add an Assessment" 
            open={assModalControl.open} 
            onOk={handleModalSubmit} 
            onCancel={handleModalSubmit}>
        <Form layout="vertical">
            <Form.Item label="Assessment Name">
                <Input
                    placeholder="Enter assessment name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Item>

            <Form.Item label="Due Date">
                <DatePicker showTime onOk={handleDateChange} />
            </Form.Item>

            <Form.Item label="Weight | Goal | Grade (Optional) (%)">
                <Space>
                <InputNumber<number>
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value?.replace('%', '') as unknown as number}
                    onChange={handleWeightChange}
                    />
                <InputNumber<number>
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value?.replace('%', '') as unknown as number}
                    onChange={handleGoalChange}
                    />
                <InputNumber<number>
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value?.replace('%', '') as unknown as number}
                    onChange={(handleGradeChange)}
                    />
                </Space>
            </Form.Item>

            <Form.Item label="Status">
                <Checkbox onChange={(e) => setComplete(e.target.checked)}>Complete?</Checkbox>; 
            </Form.Item>

            </Form>
      </Modal>
    </>
  );
    
}
