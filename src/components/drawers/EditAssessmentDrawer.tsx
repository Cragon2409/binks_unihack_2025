import { useEffect, useState } from 'react';

import {
  Drawer,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  Button,
} from 'antd';

import dayjs, { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { updateAssessment } from '../../API/assessmentsSlice';
import { Assessment } from '../../common/Types';

interface EditAssessmentDrawerProps {
  assessment: Assessment
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAssessmentDrawer = ({ assessment, isOpen, setIsOpen } : EditAssessmentDrawerProps) => {
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();

  const [ name, setName ] = useState(assessment.name); 
  const [ dueDate, setDueDate ] = useState<Dayjs>(dayjs(assessment.dueDate));   
  const [ completeDate, setCompleteDate ] = useState<Dayjs | null>(dayjs(assessment.completeDate));   
  const [ complete, setComplete ] = useState<boolean>(assessment.complete);
  const [ weight, setWeight ] = useState<number>(assessment.weight);
  const [ desiredMark, setDesiredMark ] = useState<number>(assessment.desiredMark);
  const [ mark, setMark ] = useState<number | null>(assessment.mark);

  const [ form ] = Form.useForm();

  useEffect(() => {
    if (assessment) {
      form.setFieldsValue({
        assessmentName: assessment.name,
        dueDate: dayjs(assessment.dueDate),
        weight: assessment.weight,
        desiredScore: assessment.desiredMark,
        status: assessment.complete,
        mark: assessment.mark,
        completeDate: assessment.complete ? dayjs(assessment.completeDate) : null
      })
    }
  }, [assessment, form])

  const handleAssessmentCreate = () => {
    if (session) {
      const updatedAssessment = {
        userId: session.user.id,
        courseId: assessment.courseId,
        name: name,
        dueDate: dueDate.toISOString(),
        completeDate: completeDate ?  completeDate.toISOString() : null,
        weight: weight,
        desiredMark: desiredMark,
        mark: mark ?? null,
        complete: complete
      }
      dispatch(updateAssessment({
        id: assessment.id,
        assessment: updatedAssessment
      }));
    }
  }
  
  return (
    <Drawer
      title={`Edit ${assessment.name}`}
      open={isOpen} 
      onClose={() => setIsOpen(false)}
    >    
      <Form 
        form={form}
        layout="vertical" 
        onFinish={handleAssessmentCreate}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="assessmentName"
              label="Assessment Name"
            >
              <Input
                style={{
                  width: '100%'
                }}
                placeholder="Please enter assessment name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="dueDate"
              label="Due Date"
            >
              <DatePicker 
                style={{
                  width: '100%'
                }}
                showTime
                value={dueDate}
                onOk={(date) => setDueDate(date)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="weight"
              label="Assessment Weight"
            >
              <InputNumber 
                style={{
                  width: '100%'
                }}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                value={weight}
                onChange={(value) => setWeight(value ?? 0)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="desiredMark"
              label="Desired Mark"
            >
              <InputNumber 
                style={{
                  width: '100%'
                }}
                min={0}
                max={100}
                value={desiredMark}
                onChange={(value) => setDesiredMark(value ?? 0)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="status"
              label="Status"
            >
              <Checkbox 
                checked={complete} 
                onChange={(e) => setComplete(e.target.checked)}
              >
                Complete
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {
          complete && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="mark"
                  label="Assessment Mark"
                >
                  <InputNumber 
                    style={{
                      width: '100%'
                    }}
                    min={0}
                    max={100}
                    value={mark}
                    onChange={(value) => setMark(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="completeDate"
                  label="Complete Date"
                >
                  <DatePicker 
                    style={{
                      width: '100%'
                    }}
                    showTime
                    value={completeDate}
                    onOk={(date) => setCompleteDate(date)}
                  />
                </Form.Item>
              </Col>
            </Row>
          )
        }
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

export default EditAssessmentDrawer