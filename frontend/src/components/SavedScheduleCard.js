import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
// import { shortenDays, timeToString } from '../utils/format';
import SavedScheduleModal from './SavedScheduleModal';
import { useAuth } from "../contexts/AuthContext";
import '../style/SavedScheduleCard.css';

// function SavedScheduleCard({ classList, scheduleNumber}) {
function SavedScheduleCard({ title, description, classes}) {
    const [show, setShow] = useState(false);
    const [cardTitle, setTitle] = useState(title);
    const [cardDescription, setDescription] = useState(description);
    const [cardClasses, setClasses] = useState(classes);
    const [scheduleData, setScheduleData] = useState({
        title: cardTitle,
        description: cardDescription,
        classes: cardClasses
    });

    const { addToSavedSchedules, removeFromSavedSchedules, update } = useAuth();

    const handleShow = () => setShow(true);

    const saveSchedule = () => {
        //remove old schedule
        removeFromSavedSchedules(scheduleData);
        setScheduleData({
            title: cardTitle,
            description: cardDescription,
            classes: cardClasses
        });
        //add new schedule
        addToSavedSchedules(scheduleData);
    }

    const deleteSchedule = () => {
        removeFromSavedSchedules(scheduleData);
    }

    const scheduleInfo = classes.map((thisClass) => {
        return (
            <Col key={thisClass.num} className='schedule-class'>
                {/* <Row>-</Row> */}
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
                    <Button variant='purple' className='view-schedule'>Edit Schedule</Button>
                </Card.Link>
            </Card.Body>
            <SavedScheduleModal
                title={cardTitle} 
                description = {cardDescription}
                modalClasses={cardClasses}
                show={show}
                setShow={setShow}
                setCardTitle={setTitle}
                setCardDescription={setDescription}
                saveSchedule={saveSchedule}
                deleteSchedule={deleteSchedule}
                
            />
        </Card>
    );
}

export default SavedScheduleCard;