import type { DatePickerProps, MenuProps  } from 'antd';
import { Button, Modal, Input, DatePicker, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../API/hooks';
import { createAssessment } from '../../API/assessmentsSlice';
import { useState } from 'react';

const onOk = (value: DatePickerProps['value'] ) => {
    console.log('onOk: ', value);
};

interface AssessmentsModalProps {
    assessmentCreationModalControl: any
    setAssessmentCreationModalControl: any
  }

export default function AssessmentsModal(
    { assessmentCreationModalControl, setAssessmentCreationModalControl} : AssessmentsModalProps
) {
    const session = useAppSelector(( state ) => state.session.session)
    const dispatch = useAppDispatch();
    const user_id = (session as any)?.user.id
    const [selectedOption, setSelectedOption] = useState<string>("Is the Assessment Complete?");
    const [text, setText] = useState(''); 
    const [selecteDuedDate, setSelectedDueDate] = useState<any>(null);
    const [selecteCompletedDate, setSelectedCompletedDate] = useState<any>(null);


    const handleMenuClick: MenuProps["onClick"] = (e) => {
        setSelectedOption(e.key || "Is the Assessment Complete?");
      };

    const handleModalSubmit = () => {
        const assessment = {user_id : user_id, name : text}
        dispatch(createAssessment(assessment))
        setAssessmentCreationModalControl({ open: false });
    }

    const handleModalCancel = () => {
        setAssessmentCreationModalControl({ open: false });
    }

    const items: MenuProps["items"] = [
        {
          key: "Completed",
          label: "Completed",
        },
        {
          key: "Not Completed",
          label: "Not Completed",
        },
      ];

    return (
    <>
      <Modal title="Add a Assessment" 
            open={assessmentCreationModalControl.open}
            afterClose={() => setSelectedOption("Is the Assessment Complete?")}
            onOk={handleModalSubmit} 
            onCancel={handleModalCancel}
            className="TEST">
            
        <Input
            placeholder="Enter Assessment Name"
            value={text}
        />
        <DatePicker
            placeholder="Select Due Date"
            showTime
            onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
            onOpenChange={(isOpen) => !isOpen && setSelectedDueDate(null)}
        />
        <DatePicker
            placeholder="Select Completed Date"
            showTime
            onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
            onOpenChange={() => setSelectedCompletedDate(null)}
        />
        <Input
            placeholder="Enter Weight of Assessment"
            value={text}
        />
        <Input
            placeholder="Enter Target Marks"
            value={text}
        />
        <Input
            placeholder="Enter Current Marks"
            value={text}
        />
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Button>
                        {selectedOption}
                        <DownOutlined />
                    </Button>
                </Space>
            </a>
        </Dropdown>
      </Modal>
    </>
  );
    
}
