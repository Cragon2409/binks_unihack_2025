import { useAppDispatch, useAppSelector} from '../../API/hooks'
import{ Card, Flex, Button  }from"antd";
import { useEffect } from 'react'
import { deleteAssessment, fetchAssessments } from '../../API/assessmentsSlice'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import AssessmentsModal from './AssessmentsModal';


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
      <Card title={assessment?.name ? assessment.name : 'Unknown'} key={index}>
        <div>{`Due date: ${assessment.due_date}`}</div>
        <div>{`Completed date: ${assessment.complete_date}`}</div>
        <div>{`Weight: ${assessment.weight}`}</div>
        <div>{`Target marks: ${assessment.goal_mark}`}</div>
        <div>{`Marks: ${assessment.mark}`}</div>
        <div>{`Completed?: ${assessment.complete ? "Yes" : "No"}`}</div>

        <div>
        <Button 
            icon={<DeleteOutlined />} 
            onClick={(e) => { e.stopPropagation(); handleAssessmentDelete(assessment.id); }} 
            danger 
          />
          <Button
            icon={<EditOutlined />} 
            onClick={(e) => { e.stopPropagation(); handleOpenModal(e); }} 
          />
        </div>
      </Card>
    ))
    const createCardButton = 
      (<Card 
        key={cards.length} 
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        onClick={handleOpenModal}>
        <PlusOutlined style={{ fontSize: '40px' }}  />
      </Card>)
    cards.push(createCardButton)
    return cards
  }

  return (
    <>
      <Flex gap="small" >
        {getAssessmentCards()}
        <AssessmentsModal
            assModalControl={assessmentModalControl}
            setAssModalControl={setAssessmentModalControl}
            courseId={course.id}
                  />
      </Flex>
    </>
  );
    
}