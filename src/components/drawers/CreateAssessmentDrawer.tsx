import { useState } from 'react';

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
  Space,
} from 'antd';

import dayjs, { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { createAssessment } from '../../API/assessmentsSlice';

interface CreateAssessmentDrawerProps {
  courseId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAssessmentDrawer = ({ courseId, isOpen, setIsOpen } : CreateAssessmentDrawerProps) => {
  const session = useAppSelector(( state ) => state.session.session)
  const assessments = useAppSelector(( state ) => state.assessments);
  const dispatch = useAppDispatch();

  const today = dayjs();

  const [ name, setName ] = useState(''); 
  const [ dueDate, setDueDate ] = useState<Dayjs>(today);   
  const [ completeDate, setCompleteDate ] = useState<Dayjs | null>(null);   
  const [ complete, setComplete ] = useState<boolean>(false);
  const [ weight, setWeight ] = useState<number>(0);
  const [ desiredMark, setDesiredMark ] = useState<number>(0);
  const [ mark, setMark ] = useState<number | null>(null);

  const handleAssessmentCreate = () => {
    if (session) {
      const assessment = {
        userId: session.user.id,
        courseId: courseId,
        name: name,
        dueDate: dueDate.toISOString(),
        completeDate: completeDate ?  completeDate.toISOString() : null,
        weight: weight,
        desiredMark: desiredMark,
        mark: mark ?? null,
        complete: complete
      }
      dispatch(createAssessment(assessment));
    }
  }
  
  return (
    <Drawer
      title="Create an assessment"
      open={isOpen} 
      onClose={() => setIsOpen(false)}
    >    
      <Form 
        layout="vertical" 
        requiredMark
        onFinish={handleAssessmentCreate}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="assessmentName"
              label="Assessment Name"
              rules={[{ required: true, message: 'Please enter assessment name' }]}
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
                defaultValue={today}
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
              rules={[{ required: true, message: 'Please enter weight (0-100)' }]}
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
              name="desiredScore"
              label="Desired Score"
              rules={[{ required: true, message: 'Please enter desired score (0-100)' }]}
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
              rules={[{ required: false }]}
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
                  name="score"
                  label="Assessment Score"
                  rules={[{ required: true, message: 'Please enter assessment score (0-100)' }]}
                >
                  <InputNumber 
                    style={{
                      width: '100%'
                    }}
                    min={0}
                    max={100}
                    value={mark}
                    onChange={(value) => setMark(value ?? 0)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="completeDate"
                  label="Complete Date"
                  rules={[{ required: true, message: 'Please enter assessment complete date' }]}
                >
                  <DatePicker 
                    style={{
                      width: '100%'
                    }}
                    showTime
                    defaultValue={today}
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
                loading={assessments.status == 'loading'}
              >
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
        </Form>
    </Drawer>
  )
}

export default CreateAssessmentDrawer