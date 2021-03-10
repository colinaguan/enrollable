import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import GenerateScheduleModal from './GenerateScheduleModal';
import { useAuth } from "../contexts/AuthContext";
import '../style/GenerateScheduleCard.css';

function GenerateScheduleCard({ classList, scheduleNumber}) {

    const [show, setShow] = useState(false);
    //const [title, setTitle] = useState("Schedule " + scheduleNumber);
    const [cardTitle, setTitle] = useState("Schedule " + scheduleNumber);
    const [cardDescription, setDescription] = useState("");
    const [sectionSelection, setSectionSelection] = useState({});
    const [cardClasses, setClasses] = useState(Object.assign([],classList));
    const [scheduleData, setScheduleData] = useState({
        title: cardTitle,
        description: cardDescription,
        classes: cardClasses
    });

    const { addToSavedSchedules, removeFromSavedSchedules, update } = useAuth();

    const handleShow = () => setShow(true);

    /*
    //const setSections = (classNum, sectionNum) => {
    const setSections = (scheduleData) => {
        var tempClasses = copySchedule();
        console.log("temp classes", tempClasses);
        console.log("classList", classList);
        //Object.assign(tempClasses, classList); 
        tempClasses.map( (thisClass) => {
            var tempSections = [];
            for ( const [key, value] of Object.entries(scheduleData)){
                if (thisClass.num === key){
                    thisClass.sections.map( (thisSection) => {
                        if (thisSection.num === value){
                            tempSections.push(thisSection)
                        }
                    })
                    thisClass.sections = tempSections;
                }
            }
        })
        setClasses(tempClasses);
    }
    */
   const setSections = (classNum, sectionNum) => {
       var newSectionData= {};
       var classExists = false;
       console.log("section selection", sectionSelection);
       for( const [key, value] of Object.entries(sectionSelection)){
            if (key === classNum){
                classExists = true;
                newSectionData[key] = sectionNum;
            } else {
                newSectionData[key] = value;
            }
       }
       if (!classExists){
           newSectionData[classNum] = sectionNum;
       }
       setSectionSelection(newSectionData);
       console.log("newScheduleData", newSectionData);
   }

    const copySchedule = () => {
        var tempSchedule = {};
        tempSchedule.title = cardTitle;
        tempSchedule.description = cardDescription;
        tempSchedule.classes = [];
        classList.map( (thisClass) => {
            var tempClass = {};
            tempClass.dayTime = thisClass.dayTime;
            tempClass.days = [];
            thisClass.days.map( (thisDay) => {
                tempClass.days.push(thisDay);
            })
            tempClass.start = thisClass.start;
            tempClass.end = thisClass.end;
            tempClass.num = thisClass.num;
            tempClass.priority = thisClass.priority;
            tempClass.title = thisClass.title;
            tempClass.unit = thisClass.unit
            tempClass.sections = [];
            thisClass.sections.map( (thisSection) => {
                var tempSection = {};
                tempSection.dayTime = thisSection.dayTime;
                tempSection.days = [];
                thisSection.days.map( (thisDay) => {
                    tempSection.days.push(thisDay);
                })
                tempSection.end = thisSection.end;
                tempSection.num = thisSection.num;
                tempSection.start = thisSection.start;
                tempSection.title = thisSection.title;
                tempClass.sections.push(tempSection);
            })
            tempSchedule.classes.push(tempClass);
        })
        return(tempSchedule);
    }

    const saveSchedule = () => {
        var newScheduleData = copySchedule();

        console.log(cardTitle);
        console.log(cardDescription);
        console.log(scheduleData);
        //remove old schedule
        removeFromSavedSchedules(scheduleData);
        removeFromSavedSchedules(scheduleData)
        .then( () =>{
            //update schedule object with most recent values
            
            // setScheduleData({
            //     title: cardTitle,
            //     description: cardDescription,
            //     classes: cardClasses
            // });
        
            //console.log("pre section", newScheduleData);
            newScheduleData.classes.map( (thisClass) => {
                var tempSections = [];
                for ( const [key, value] of Object.entries(sectionSelection)){
                    //console.log("key", key, "value", value);
                    //console.log("class.num", thisClass.num);
                    if (thisClass.num == key){
                        thisClass.sections.map( (thisSection) => {
                            if (thisSection.num === value){
                                tempSections.push(thisSection)
                            }
                        })
                        thisClass.sections = tempSections;
                    }
                }
            });
            //console.log("post selection", newScheduleData);

            // old create before copySchedule()
            // following creates a new object
            const savedScheduleData = {
                title: cardTitle,
                description: cardDescription,
                classes: cardClasses
            }
            //add new schedule
            addToSavedSchedules(newScheduleData)
            .then( () => {
                update();
            });
        });
    }

    const deleteSchedule = () => {
        removeFromSavedSchedules(scheduleData)
        .then( () => {;
            update();
        });
    }

    const scheduleInfo = classList.map((thisClass) => {
        return (
            <Col key={thisClass.num}>
                <Row className='schedule-class-title'>
                    <p><b>{thisClass.title}</b> {thisClass.dayTime}</p>
                </Row>
                {thisClass.sections.map(thisSection => {
                    return (
                        <Row key={thisSection.num}>
                            <Col offset={1} sm={2} className='schedule-section-title'>
                                {thisClass.title + '-' + thisSection.title}
                            </Col>
                            <Col>
                                {thisSection.dayTime}
                            </Col>
                        </Row>
                    )
                })}
            </Col>
        )
    })

    return (
        <Card className="schedule-card">
            <Card.Body className='schedule-card-body'>
                <Card.Title>
                    <h2>{"Schedule " + scheduleNumber}</h2>
                </Card.Title>
                <div className="schedule-card-text">
                    {scheduleInfo}
                </div>
                <Card.Link onClick={handleShow}>
                    <Button variant='purple' className='view-schedule'>Save Schedule</Button>
                </Card.Link>
            </Card.Body>
            <GenerateScheduleModal
                classList={classList}
                scheduleTitle={"Schedule " + scheduleNumber} 
                show={show}
                setShow={setShow}
                setCardTitle={setTitle}
                setCardDescription={setDescription}
                setCardSections={setSections}
                saveSchedule={saveSchedule}
            />
        </Card>
    );
}

export default GenerateScheduleCard;