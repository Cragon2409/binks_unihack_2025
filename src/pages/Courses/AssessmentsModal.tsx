import type { DatePickerProps, GetProps } from 'antd';
import { Modal, Input, DatePicker } from 'antd';
import { useAppDispatch, useAppSelector } from '../../API/hooks';
import { createAssessment } from '../../API/assessmentsSlice';
import { useState } from 'react';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
};

interface AssessmentModalProps {
    assessmentModalControl: any
    setAssessmentModalControl: any
  }

export default function AssessmentsModal(
    { assessmentModalControl, setAssessmentModalControl} : AssessmentModalProps
) {
    const session = useAppSelector(( state ) => state.session.session)
    const dispatch = useAppDispatch();
    const [text, setText] = useState(''); 
    const user_id = (session as any)?.user.id

    const handleModalSubmit = () => {
        const assessment = {user_id : user_id, name : text}
        dispatch(createAssessment(assessment))
        setAssessmentModalControl({ open: false });
    }

    return (
    <>
      <Modal title="Add a Assessment" 
            open={assessmentModalControl.open} 
            onOk={handleModalSubmit} 
            onCancel={handleModalSubmit}>
        <Input
            placeholder="Enter Assessment name"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <>due date</>
            <DatePicker
        showTime
        onChange={(value, dateString) => {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
        }}
        onOk={onOk}
        />
        <RangePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={(value, dateString) => {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
        }}
        onOk={onOk}
        />
        <>complete date</>
        <>weight</>
        <>goal mark</>
        <>mark</>
        <>complete</>
        <>user id</>

      </Modal>
    </>
  );
    
}
