import React, { useState, useEffect, handleClick, Button, Menu, handleClose, MenuItem } from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import { shortenDays, timeToString } from '../utils/format';
import GenerateScheduleModal from './GenerateScheduleModal';
import '../style/GenerateScheduleCard.css';

function GenerateScheduleCard({ classList, scheduleNumber}) {

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("Schedule " + scheduleNumber);

    const handleShow = () => setShow(true);

    return (
        //All of this formatting needs work
        <Col xs={12}>
        <Card classname="class-card">
            <Card.Body classname='class-card-body'>
                <Row>
                    <Col>
                <Card.Title>
                    <b>{title}</b>
                </Card.Title>
                <Card.Text>
                    {
                    classList.map(thisClass => {
                        return (
                            <Col>
                            <Row>
                            {thisClass.title + ' ' + thisClass.dayTime} 
                            </Row>
                            {console.log(thisClass.sections)}
                            {thisClass.sections.map(thisSection => {
                                return (
                                    <Row>
                                        <Col offset={1}>
                                    {thisClass.title + '-' + thisSection.title + ' ' + thisSection.dayTime}
                                        </Col>
                                    </Row>
                                )
                            })}
                            </Col>
                        )
                    })
                    }
                </Card.Text>
                <Card.Link onClick={handleShow}>
                    View Schedule
                </Card.Link>
                    </Col>
                </Row>
            </Card.Body>
            <Col textAlign="center">
            <GenerateScheduleModal classList={classList} scheduleTitle={"Schedule " + scheduleNumber} 
                show={show} setShow={setShow} setCardTitle={setTitle}/>
            </Col>
        </Card>
        </Col>
    );
}

export default GenerateScheduleCard;