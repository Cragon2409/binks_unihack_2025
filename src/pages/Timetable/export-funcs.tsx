import {createEvents} from 'ics';


export type event = {
    start : number[],
    duration? : {
        hours : number,
        minutes : number
    },
    end : number[],
    title : string,
    description : string,
    location? : string,
    url? : string,
    geo? : {
        lat : number,
        lon : number
    },
    categories : string[],
    status? : string,
    busyStatus? : string,
    organizer? : {
        name : string,
        email: string 
    },
    attendees? : {
        name : string,
        email : string,
        rvsp : boolean,
        dir : string,
        role : string,
        partstat : string
    }[]

}

function getAssessmentCourse(assessment : any, courses : any) {
    for (var course of courses) {
        if (assessment.course_id == course.id) {
            return course;
        }
    }
    return null;
}

function convertISOtoICSTime(time : string) {
    const iso = new Date(time)
    return [
        iso.getFullYear(),
        iso.getMonth() + 1,
        iso.getDate(),
        iso.getHours(),
        iso.getMinutes(),
    ]
}
  
function convertAssessmentToEvent(assessment : any, courses : any) {
    const course = getAssessmentCourse(assessment, courses)

    const icsTime = convertISOtoICSTime(assessment.due_date)
    const endICSTime = convertISOtoICSTime((new Date(new Date(assessment.due_date).getTime() + 60*60*1000) ).toISOString())
    
    console.log(icsTime);

    const newEvent : event = {
        start : icsTime,
        end : endICSTime,
        categories : ["assessment", "uni"],
        title : course.name + ": " + (assessment.name ?? "Assessment"),
        description : (assessment.complete == "TRUE") ? 
            ("Assessmented completed at " + assessment.complete_date + ". Weight of " + assessment.weight.toString()) : 
            ("Assessment not yet completed. Weight of " + assessment.weight.toString())
    }

    return newEvent

}

export function downloadICS(assessments : any, courses : any) {
    const events = assessments.map((assessment : any) => convertAssessmentToEvent(assessment, courses))

    createEvents(events, (error, value) => {
        if (error) {
            console.error("Error generating ICS file:", error);
            return;
        }

        const blob = new Blob([value], { type: "text/calendar;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `events.ics`;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}