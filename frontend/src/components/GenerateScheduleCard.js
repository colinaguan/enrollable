import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
// import { shortenDays, timeToString } from '../utils/format';
import GenerateScheduleModal from './GenerateScheduleModal';
import { useAuth } from "../contexts/AuthContext";
import '../style/GenerateScheduleCard.css';
import SavedSchedulesPage from './SavedSchedulesPage';

function GenerateScheduleCard({ classList, scheduleNumber}) {

    const [show, setShow] = useState(false);
    //const [title, setTitle] = useState("Schedule " + scheduleNumber);
    const [cardTitle, setTitle] = useState("Schedule " + scheduleNumber);
    const [cardDescription, setDescription] = useState("");
    const [cardClasses, setClasses] = useState(classList);
    const [scheduleData, setScheduleData] = useState({
        title: cardTitle,
        description: cardDescription,
        classes: cardClasses
    });

    const { addToSavedSchedules, removeFromSavedSchedules, update } = useAuth();

    const handleShow = () => setShow(true);

    const saveSchedule = () => {
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
        
            // above update is incorrect
            // following creates a new object
            const savedScheduleData = {
                title: cardTitle,
                description: cardDescription,
                classes: cardClasses
            }
            //add new schedule
            addToSavedSchedules(savedScheduleData)
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
                    <h2>{cardTitle}</h2>
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
                saveSchedule={saveSchedule}
            />
        </Card>
    );
}

export default GenerateScheduleCard;