import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { shortenDays, timeToString } from '../utils/format';
import GenerateScheduleModal from './GenerateScheduleModal';
import '../style/GenerateScheduleCard.css';

function GenerateScheduleCard({ classList, scheduleNumber}) {

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("Schedule " + scheduleNumber);

    const handleShow = () => setShow(true);

    const scheduleInfo = classList.map(thisClass => {
        console.log(thisClass)
        return (
            <Col>
                <Row>
                    <p className='schedule-class-title'>
                        <b>{thisClass.title}</b> {thisClass.dayTime}
                    </p>
                </Row>
                {thisClass.sections.map(thisSection => {
                    return (
                        <Row>
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
                    <h2>{title}</h2>
                </Card.Title>
                <Card.Text className="schedule-card-text">
                    {scheduleInfo}
                </Card.Text>
                <Card.Link onClick={handleShow}>
                    <Button variant='purple' className='view-schedule'>View Schedule</Button>
                </Card.Link>
            </Card.Body>
            <GenerateScheduleModal
                classList={classList}
                scheduleTitle={"Schedule " + scheduleNumber} 
                show={show}
                setShow={setShow}
                setCardTitle={setTitle}
            />
        </Card>
    );
}

export default GenerateScheduleCard;