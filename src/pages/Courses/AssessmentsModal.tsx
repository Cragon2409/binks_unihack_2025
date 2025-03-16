import { Modal, Input, Form, InputNumber, Checkbox, DatePicker, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { createAssessment, updateAssessment } from '../../API/assessmentsSlice';
import { useEffect, useState } from 'react'
import type { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

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
    const [dueDate, setDueDate] = useState<Dayjs | null>(null);
    const [completeDate, setCompleteDate] = useState<Dayjs | null>(null);  
    const [weight, setWeight] = useState<number | null>(0); 
    const [goal, setGoal] = useState<number | null>(0); 
    const [grade, setGrade] = useState<number | null>(0);
    const [complete, setComplete] = useState(false)
    const user_id = (session as any)?.user.id

    useEffect(() => {
        if (assModalControl?.editMode && assModalControl?.row) {
          setName(assModalControl.row.name || '');
          setDueDate(assModalControl.row.due_date ? dayjs(assModalControl.row.due_date) : null);
          setCompleteDate(assModalControl.row.complete_date ? dayjs(assModalControl.row.complete_date) :null);
          setWeight(assModalControl.row.weight || 0);
          setGoal(assModalControl.row.goal_mark || 0);
          setGrade(assModalControl.row.mark || 0);
          setComplete(assModalControl.row.complete || false);
        } else {
          setName('');
          setDueDate(null);
          setCompleteDate(null);
          setWeight(0);
          setGoal(0);
          setGrade(0);
          setComplete(false);
        }
      }, [assModalControl]);

    const handleDateChange: DatePickerProps['onOk'] = (value) => {
        if (value) {
            setDueDate(value); // Convert moment object to a string
        }
    };

    const handleCompleteDateChange: DatePickerProps['onOk'] = (value) => {
        if (value) {
            setCompleteDate(value); // Convert moment object to a string
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
        if (assModalControl?.editMode) {
            const assessment = {
                user_id : user_id,
                course_id: courseId,
                name: name,
                due_date: dueDate?.toISOString(),
                complete_date: completeDate?.toISOString(),
                weight: weight,
                goal_mark: goal,
                mark: grade,
                complete: complete
            }
        dispatch(updateAssessment({id: assModalControl.row.id, assessment}))
        } else {
        const assessment = {
            user_id : user_id,
            course_id: courseId,
            name: name,
            due_date: dueDate?.toISOString(),
            complete_date: completeDate?.toISOString(),
            weight: weight,
            goal_mark: goal,
            mark: grade,
            complete: complete
         }
        dispatch(createAssessment(assessment))
        }
        setAssModalControl({ open: false, editMode: false, row: null });
        setName('')
        setDueDate(dayjs())
        setCompleteDate(dayjs())
        setWeight(0)
        setGoal(0)
        setGrade(0)
        setComplete(false)
    }

    const handleModalCancel = () => {
        setAssModalControl({ open: false, editMode: false, row: null });
    }
    return (
    <>
      <Modal title="Add an Assessment" 
            open={assModalControl.open} 
            onOk={handleModalSubmit} 
            onCancel={handleModalCancel}>
        <Form layout="vertical">
            <Form.Item label="Assessment Name">
                <Input
                    placeholder="Enter assessment name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Item>

            <Form.Item label="Due Date">
                <DatePicker showTime value={dueDate} onOk={handleDateChange} />
            </Form.Item>

            <Form.Item label="Weight | Goal | Grade (Optional) (%)">
                <Space>
                <InputNumber<number>
                    value={weight}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value?.replace('%', '') as unknown as number}
                    onChange={handleWeightChange}
                    />
                <InputNumber<number>
                    value={goal}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value?.replace('%', '') as unknown as number}
                    onChange={handleGoalChange}
                    />
                <InputNumber<number>
                    value={grade}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value?.replace('%', '') as unknown as number}
                    onChange={(handleGradeChange)}
                    />
                </Space>
            </Form.Item>

            <Form.Item label="Status">
                <Checkbox checked = {complete} onChange={(e) => setComplete(e.target.checked)}>Complete?</Checkbox>
            </Form.Item>

            <Form.Item label="Complete Date">
                <DatePicker showTime value={completeDate} onOk={handleCompleteDateChange} />
            </Form.Item>

            </Form>
      </Modal>
    </>
  );
    
}
