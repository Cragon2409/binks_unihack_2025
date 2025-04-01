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
  const session = useAppSelector(( state ) => state.session.session);
  const assessments = useAppSelector(( state ) => state.assessments);
  const dispatch = useAppDispatch();

  const [ name, setName ] = useState(assessment.name); 
  const [ dueDate, setDueDate ] = useState<Dayjs>(dayjs(assessment.dueDate));   
  const [ completeDate, setCompleteDate ] = useState<Dayjs>(dayjs(assessment.completeDate));   
  const [ complete, setComplete ] = useState<boolean>(assessment.complete);
  const [ weight, setWeight ] = useState<number>(assessment.weight);
  const [ desiredMark, setDesiredMark ] = useState<number>(assessment.desiredMark);
  const [ mark, setMark ] = useState<number | null>(assessment.mark);

  const [ form ] = Form.useForm();

  useEffect(() => {
    if (assessment) {
      setName(assessment.name);
      setDueDate(dayjs(assessment.dueDate));
      setCompleteDate(dayjs(assessment.completeDate));
      setComplete(assessment.complete);
      setWeight(assessment.weight);
      setDesiredMark(assessment.desiredMark);
      setMark(assessment.mark);

      form.setFieldsValue({
        name: assessment.name,
        dueDate: dayjs(assessment.dueDate),
        completeDate: assessment.completeDate ? dayjs(assessment.completeDate) : null,
        complete: assessment.complete,
        weight: assessment.weight,
        desiredScore: assessment.desiredMark,
        mark: assessment.mark,
      });
    }
  }, [assessment, form])

  const handleAssessmentEdit = () => {
    if (session) {
      const updatedAssessment = {
        id: assessment.id,
        userId: session.user.id,
        courseId: assessment.courseId,
        createdAt: assessment.createdAt,
        name: name,
        dueDate: dueDate.toISOString(),
        completeDate: completeDate.isValid() ?  completeDate.toISOString() : null,
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
        onFinish={handleAssessmentEdit}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name='name'
              valuePropName='value'
              label='Assessment Name'
            >
              <Input
                style={{
                  width: '100%'
                }}
                placeholder='Please enter assessment name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name='dueDate'
              valuePropName='value'
              label='Due Date'
            >
              <DatePicker 
                style={{
                  width: '100%'
                }}
                showTime
                onOk={(date) => setDueDate(date)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='weight'
              valuePropName='value'
              label="Assessment Weight"
            >
              <InputNumber 
                style={{
                  width: '100%'
                }}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                onChange={(value) => setWeight(value ?? 0)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="desiredMark"
              valuePropName='value'
              label="Desired Mark"
            >
              <InputNumber 
                style={{
                  width: '100%'
                }}
                min={0}
                max={100}
                onChange={(value) => setDesiredMark(value ?? 0)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name='complete'
              valuePropName='checked'
              label="Status"
            >
              <Checkbox 
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
                  name='mark'
                  valuePropName='value'
                  label='Assessment Mark'
                  rules={[{ required: true, message: 'Please enter assessment mark (0-100)' }]}
                >
                  <InputNumber 
                    style={{
                      width: '100%'
                    }}
                    min={0}
                    max={100}
                    onChange={(value) => setMark(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='completeDate'
                  valuePropName='value'
                  label='Complete Date'
                  rules={[{ required: true, message: 'Please enter assessment complete date' }]}
                >
                  <DatePicker 
                    style={{
                      width: '100%'
                    }}
                    showTime
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
                type='primary'
                htmlType='submit'
                loading={assessments.status == 'loading'}
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