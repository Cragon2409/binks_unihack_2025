import { Typography, Checkbox, Flex, List, Card, Progress, theme } from 'antd';
import { fetchAssessments } from '../../API/assessmentsSlice';
import { fetchCourses } from '../../API/coursesSlice'
import { useAppDispatch, useAppSelector } from '../../API/hooks'
import { useEffect, useState } from 'react'

const { Title } = Typography;
const WEEKDAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
]

function getFormatFromISO(isoDate : string) {
  const dateObj = new Date(isoDate)
  const mins = dateObj.getUTCMinutes()
  return dateObj.getUTCHours() + ':' + ((mins < 10) ? ('0' + mins) : (mins))  + ", " + WEEKDAYS[dateObj.getUTCDay()] + ' ' + dateObj.getUTCDate() + '/' + (dateObj.getUTCMonth() + 1)
}

function getItemCourse(item : any, courses : any) {
  for (var course of courses) {
    if (item.course_id == course.id) {
      return course;
    }
  }
  return null;
}

function getLatestDay(assessments : any) {
  const currentDate = new Date().toISOString();
  const incompleteAssessments = assessments.filter((item : any) => item.complete == false && item.due_date.localeCompare(currentDate)); //filter out past and completed assessments

  if (incompleteAssessments.length === 0) {
    return 0;
  }

  const latestItem = new Date(incompleteAssessments.reduce((latest : any, current : any) => latest.due_date.localeCompare(current.due_date) ? latest : current ).due_date)

  const timeDifference = latestItem.getTime() - (new Date()).getTime()

  return Math.ceil(timeDifference / (1000 * 3600 * 24))
}

function toggleVisible(selectedCourses : SelectedCourse[], selectedCourse : SelectedCourse, setter : any, value : boolean, reloadFunc : any) {
  selectedCourse.visible = value
  setter(selectedCourses)
  reloadFunc()
}

function getAssessmentProgress(assessment : any) {
  if (assessment.length == 0) {return 100}
  return Math.ceil(100 * assessment.filter((item : any) => item.complete).length / assessment.length)
}

type SelectedCourse = {
  name : string,
  courseId : number,
  visible : boolean,
  colour : string
}

export default function Dashboard() {
  const session = useAppSelector(( state ) => state.session.session)
  const assessments = useAppSelector(( state) => state.assessments.assessments);
  const courses = useAppSelector(( state) => state.courses.courses);
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();
  const [selectedCourses, setSelectedCourses] = useState([] as SelectedCourse[])
  const [reloadFlag, setReloadFlag] = useState(false)

  function reloadPage() {
    setReloadFlag(!reloadFlag)
  }

  const currentDate = new Date().toISOString();

  var currentCourses : any = courses.filter((course) => {
    return assessments.some((assessment) => assessment.course_id == course.id)
  })
  var filteredCourses : any = selectedCourses.filter((selCourse) => selCourse.visible)
  var filteredAssesments : any = assessments.filter((assessment) => {
    return filteredCourses.some((course : any) => course.id == assessment.course_id)
  })
  var countdownDays = getLatestDay(filteredAssesments)
  var assessmentProgress = getAssessmentProgress(filteredAssesments)
  var jarJarHappy = filteredAssesments.filter((ass : any) => (
    (ass.complete_date ?? "ZZZZZ").localeCompare(ass.due_date ?? "") && !(ass.complete_date == null && (ass.due_date.localeCompare(currentDate)))
  )).length <= (filteredAssesments.length / 2)  



  useEffect(() => {
      dispatch(fetchCourses((session as any)?.user.id));
      dispatch(fetchAssessments((session as any)?.user.id));
  }, [session]);

  useEffect(() => {
    // console.log(assessments)
    // assessments.slice().sort((a,b) => (b.due_date ?? "").localeCompare((a.due_date ?? "").toString()))
    //assessments.sort((a,b) => b.toString().localeCompare(a.toString()))

    countdownDays = getLatestDay(filteredAssesments)
    assessmentProgress = getAssessmentProgress(filteredAssesments)
    currentCourses = courses.filter((course) => {
      return assessments?.some((assessment) => assessment.course_id == course.id)
    })

    var tempSelectedCourses : SelectedCourse[] = [];
    for (var course of currentCourses) {
      tempSelectedCourses.push({
        name : course.name,
        courseId : course.id,
        visible : true,
        colour : course.colour_code
      })
    }
    setSelectedCourses(tempSelectedCourses);

    
    filteredCourses = selectedCourses.filter((selCourse) => selCourse.visible)
    filteredAssesments = assessments.filter((assessment) => {
      return filteredCourses.some((course : any) => course.courseId == assessment.course_id)
    })
  }, [assessments])

  filteredCourses = selectedCourses.filter((selCourse) => selCourse.visible)
  filteredAssesments = assessments.filter((assessment) => {
    return filteredCourses.some((course : any) => course.courseId == assessment.course_id)
  })

  countdownDays = getLatestDay(filteredAssesments)
  assessmentProgress = getAssessmentProgress(filteredAssesments)
  jarJarHappy = filteredAssesments.filter((ass : any) => (
      (ass.complete_date ?? "ZZZZZ").localeCompare(ass.due_date ?? "") && !(ass.complete_date == null && (ass.due_date.localeCompare(currentDate)))
    )).length <= (filteredAssesments.length / 2) 


  return (
    <main className="dashboard-page">
      <Title>Dashboard</Title>

      <div className="main-content" style={{backgroundColor: token.colorBgContainer, borderColor : token.colorBorder}}>
        <div className="small" style={{marginBottom: "0px"}}>
          <List
            grid={{ gutter: 20, column: 5 }}
            dataSource={selectedCourses}
            renderItem={(course : any) => {
                return (
                  <List.Item>
                    <Flex gap="small" justify="space-between" style={{backgroundColor : course.colour, borderColor: token.colorBorderSecondary, borderRadius: "4px", padding:"3px"}}>
                      <Typography.Text >[{course.name}]</Typography.Text> 
                      <Checkbox defaultChecked={course.visible} onChange={(e) => toggleVisible(selectedCourses, course, setSelectedCourses, e.target.checked, reloadPage)}/>
                    </Flex>
                  </List.Item>
                )
              }
            }
          />
        </div>
        <div className="large">
        <List
          style={{backgroundColor : token.colorBgBase, overflow: "auto", height:"30vh"}}
          header={<div><Typography.Link href="/timetable" rel="noopener noreferrer">Upcoming Assessments</Typography.Link></div>}
          bordered
          dataSource={filteredAssesments.filter((item : any)=> item.due_date.localeCompare(currentDate))}
          renderItem={(item : any) => {
              const course = getItemCourse(item, courses)
              return (
                <List.Item>
                  <Flex align="center" gap={350}>
                    <Typography.Text style={{backgroundColor : course.colour_code}}>{course.name}</Typography.Text> 
                    <Typography.Text>{getFormatFromISO(item.due_date)}</Typography.Text>
                    <div>
                      <Checkbox defaultChecked={(item.complete)} />

                    </div>
                  </Flex>
                </List.Item>
              )
            }
          }
        />
        </div>

        <div className="grid">
          <div className="small">
            <List
              style={{ height: "20vh", backgroundColor : token.colorBgBase, overflow: "auto"}}
              header={<div>Recent Marks</div>}
              bordered
              dataSource={filteredAssesments.filter((item : any)=> item.due_date.localeCompare(currentDate) && item.complete).slice().reverse()}
              renderItem={(item : any) => {
                  const course = getItemCourse(item, courses)
                  return (
                    <List.Item>
                      <Flex gap="small" align="center">
                        <Typography.Text style={{backgroundColor : course.colour_code}}>[{course.name}]</Typography.Text> 
                        <Typography.Text style={{color : (item.mark >= item.goal_mark) ? "green" : "red"}}>{item.mark}</Typography.Text> ( Goal: {item.goal_mark} )
                      </Flex>
                    </List.Item>
                  )
                }
              }
            />
          </div>
          <div className="small">
            <List
              style={{ height: "20vh", backgroundColor : token.colorBgBase,  overflow: "auto"}}
              header={<div><Typography.Link href="/courses" rel="noopener noreferrer">Courses</Typography.Link></div>}
              bordered
              dataSource={courses}
              renderItem={(course) => {
                  return (
                    <List.Item style={{backgroundColor : course.colour_code}}>
                      {course.name}
                    </List.Item>
                  )
                }
              }
            />
          </div>
          <div className="small">
          <List
              style={{ height: "20vh", backgroundColor : token.colorBgBase }}
              header={<div>Quick Links</div>}
              bordered
              dataSource={[]}
              renderItem={(_item) => {
                  return (
                    <List.Item>
                      TODO
                    </List.Item>
                  )
                }
              }
            />
          </div>
          <div className="small">
            <Card title="Jar Jar Meter" style={{ width: 300, height:"100%", backgroundColor : token.colorBgBase}}>
              
              {(jarJarHappy) ? (
                <>
                  Jar Jar Approves of your current academic performance!
                  <img src={"https://media4.giphy.com/media/olnuKV0a3Et5C/giphy.gif?cid=6c09b952gwey4uwypxcnfr2hrel245qx4wcd85bgnerngfxh&ep=v1_gifs_search&rid=giphy.gif&ct=g"} alt="Gif" style={{ width: '100%' }} />
                </>
                ) :
                (
                  <>
                    Jar Jar encourages you to keep going and improve! (menacingly)
                    <img src={"https://media.tenor.com/Kn7YgWfsMxAAAAAM/darth-jar-jar.gif"} alt="Gif" style={{ width: '100%' }} />
                  </>
                )}
            </Card>
          </div>
          <div className="small">
            <Card title="Countdown" style={{ height: "100%", backgroundColor : token.colorBgBase }}>
              {(countdownDays == 0) ? (
                <>All done! Congratulations!</>
              ) : (
                <>
                  <Flex align="center" vertical>
                    <Typography.Text style={{fontSize:"6vh"}}>
                      {countdownDays}
                    </Typography.Text>
                    <Typography.Text  style={{fontSize:"1.5vh"}}>
                        days left!
                    </Typography.Text>
                  </Flex>
                </>
              )}
              
            </Card>
          </div>
          <div className="small">
            <Card title="Progress" style={{ height: "100%", justifyContent: 'center', backgroundColor : token.colorBgBase }} >
              <Flex justify='center' vertical={true} align="center">
                <Progress type="circle" percent={assessmentProgress} />
                <Typography.Text>
                  {(assessmentProgress == 100) ? (
                    <>All Assignments Done!</>
                  ) : (
                    <>{Math.round((1 - assessmentProgress / 100) * assessments.length)} Assessment{(Math.round((1 - assessmentProgress / 100) * assessments.length) != 1) ? ("s") : ("")} Remaining </>
                  )}
                </Typography.Text>
              </Flex>
            </Card>
          </div>
        </div>
      </div>
    </main>
    

  );
}