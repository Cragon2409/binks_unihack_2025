import { Typography } from 'antd';
import { fetchAssessments } from '../../API/assessmentsSlice';
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { useEffect } from 'react'

const { Title } = Typography;

export default function Dashboard() {
  const session = useAppSelector(( state ) => state.session.session)
  const assessments = useAppSelector(( state) => state.assessments.assessments);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchAssessments((session as any)?.user.id));
  }, [session]);

  useEffect(() => {
    console.log(assessments)
  }, [assessments])

  return (
    <main className="dashboard-page">
      <Title>Dashboard</Title>

      <div className="main-content">
        <div className="large">Large Item</div>
        <div className="grid">
          <div className="small">Item 1</div>
          <div className="small">Item 2</div>
          <div className="small">Item 3</div>
          <div className="small">Item 4</div>
          <div className="small">Item 5</div>
          <div className="small">Item 6</div>
        </div>
      </div>
    </main>
    

  );
}