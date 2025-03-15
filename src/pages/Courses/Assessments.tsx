import { useAppDispatch, useAppSelector} from '../../API/hooks'
import{ Card, Flex, Button  }from"antd";
import { useEffect } from 'react'
import { fetchAssessments } from '../../API/assessmentsSlice'



interface AssessmentModalProps {
  course: any
  assessmentModalControl: any
  setAssessmentModalControl: any
}

export default function Assessments(
  { course } : AssessmentModalProps
) {
  const assessments = useAppSelector(( state ) => state.assessments.assessments)
  const session = useAppSelector(( state ) => state.session.session)
  const dispatch = useAppDispatch();
  const relevantAssessments = assessments.filter(assessment => assessment.course_id == course.id)


  useEffect(() => {
    dispatch(fetchAssessments((session as any)?.user.id));
  }, [session]);

  return (
    <>
      <Flex gap="small" >
        {relevantAssessments.map((assessment, index) =>(
          <Card title={assessment.name} key={index}>
            <div>{`Due date: ${assessment.due_date}`}</div>
            <div>{`Completed date: ${assessment.complete_date}`}</div>
            <div>{`Weight: ${assessment.weight}`}</div>
            <div>{`Target marks: ${assessment.goal_mark}`}</div>
            <div>{`Marks: ${assessment.mark}`}</div>
            <div>{`Completed?: ${assessment.complete ? "Yes" : "No"}`}</div>

            <div>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          </Card>
        ))}
      </Flex>
    </>
  );
    
}