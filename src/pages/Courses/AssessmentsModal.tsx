import type { DatePickerProps, MenuProps  } from 'antd';
import { Button, Modal, Input, DatePicker, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../API/hooks';
import { createAssessment } from '../../API/assessmentsSlice';
import { useState } from 'react';



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
    const [nameText, setNameText] = useState(''); 
    const [selectedDueDate, setSelectedDueDate] = useState<any>(null);
    const [selectedCompletedDate, setSelectedCompletedDate] = useState<any>(null);


    const handleMenuClick: MenuProps["onClick"] = (e) => {
        setSelectedOption(e.key || "Is the Assessment Complete?");
      };

    const clearFields = () => {
        setSelectedDueDate(null)
        setSelectedCompletedDate(null)
    }

    const handleModalSubmit = () => {
        // const assessment = {user_id : user_id, name : text}
        // dispatch(createAssessment(assessment))
        setAssessmentCreationModalControl({ open: false });
        clearFields();
    }

    const handleModalCancel = () => {
        setAssessmentCreationModalControl({ open: false });
        clearFields();
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
    
    const onOkDue = (value: DatePickerProps['value'] ) => {
        console.log('onOk: ', value);
        setSelectedDueDate(value)
    };

    const onOkComplete = (value: DatePickerProps['value'] ) => {
        console.log('onOk: ', value);
        setSelectedCompletedDate(value)
    };

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
            value={nameText}
        />
        <DatePicker
            placeholder="Select Due Date"
            showTime
            value={selectedDueDate}
            onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOkDue}
        />
        <DatePicker
            placeholder="Select Completed Date"
            showTime
            value={selectedCompletedDate}
            onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOkComplete}
        />
        <Input
            placeholder="Enter Weight of Assessment"
            // value={text}
        />
        <Input
            placeholder="Enter Target Marks"
            // value={text}
        />
        <Input
            placeholder="Enter Current Marks"
            // value={text}
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
