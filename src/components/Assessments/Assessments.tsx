import { useAppDispatch, useAppSelector} from '../../API/hooks'
import{ Card, Flex, Button, Typography  }from"antd";
import { useEffect } from 'react'
import { deleteAssessment, fetchAssessments } from '../../API/assessmentsSlice'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import AssessmentsModal from './AssessmentsModal'

const { Text } = Typography;

interface AssessmentModalProps {
  course: any
  assessmentModalControl: any
  setAssessmentModalControl: any
}

export default function Assessments(
  { course, assessmentModalControl, setAssessmentModalControl } : AssessmentModalProps
) {
  const assessments = useAppSelector(( state ) => state.assessments.assessments)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();
  const relevantAssessments = assessments.filter(assessment => assessment.course_id == course.id)


  useEffect(() => {
    dispatch(fetchAssessments((session as any)?.user.id));
  }, [session]);

  const handleOpenModal = (_e : any) => {
    console.log('open')
    setAssessmentModalControl({open: true})
  }

  const handleAssessmentDelete = (assID: number) => {
      dispatch(deleteAssessment(assID))
  }

  const getAssessmentCards = () => {
    let cards = relevantAssessments.map((assessment, index) =>(
      <Card 
        style={{
          minWidth: 250,
          height: 300
        }}
        title={assessment?.name ? assessment.name : 'Unknown'} 
        key={index} 
        hoverable
      >
        <Flex vertical gap='small'>
          <Text>{`Due date: ${assessment.due_date !== null ? new Date(assessment.due_date).toDateString() : ""}`}</Text>
          <Text>{`Completed date: ${assessment.complete_date !== null ? new Date(assessment.complete_date).toDateString() : ""}`}</Text>
          <Text>{`Weight: ${assessment.weight}`}</Text>
          <Text>{`Target marks: ${assessment.goal_mark}`}</Text>
          <Text>{`Marks: ${assessment.mark}`}</Text>
          <Text>{`Completed?: ${assessment.complete ? "Yes" : "No"}`}</Text>
          <Flex gap='small'>
            <Button 
              icon={<DeleteOutlined />} 
              onClick={(e) => { e.stopPropagation(); handleAssessmentDelete(assessment.id); }} 
              danger 
            />
            <Button
              icon={<EditOutlined />} 
              onClick={(e) => { e.stopPropagation(); handleOpenModal(e); }} 
            />
          </Flex>
        </Flex>
      </Card>
    ))
    const createCardButton = (
      <Card 
        style={{
          display: "flex",
          minWidth: 250,
          height: 300,
          alignItems: "center",
          justifyContent: "center"
        }}
        key={cards.length} 
        onClick={handleOpenModal}
        hoverable
      >
        <PlusOutlined style={{ fontSize: '40px' }} />
      </Card>
    )
    cards.push(createCardButton)
    return cards
  }

  return (
    <Flex gap="large" wrap='wrap'>
      {getAssessmentCards()}
      <AssessmentsModal
        assModalControl={assessmentModalControl}
        setAssModalControl={setAssessmentModalControl}
        courseId={course.id}
      />
    </Flex>
  );
    
}