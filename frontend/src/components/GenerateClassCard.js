import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { shortenDays, timeToString } from '../utils/format';
import GenerateSectionsModal from './GenerateSectionsModal';

function GenerateClassCard({ classNum, handleSelectedClasses }) {

    const [classData, setClassData] = useState({});

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // get data from API
        fetch('course/course=' + classNum)
        .then(res => res.json())
        .then(data => {
            setClassData(data);
        })
        .catch(() => {
            console.error("classNum API call not responding")
            return;
        });       
    }, [classNum]);

    // check if data has been updated
    if (classData['num']) {
        // class title (ex: CSE 101-01)
        var classTitle = classData['dep'].toUpperCase() + ' ' + classData['code'];
        if (classData['classSection'] !== '01') classTitle += '-' + classData['classSection'];
        // class day time info
        var classDay = shortenDays(classData['day']);
        var classStart = timeToString(classData['start']);
        var classEnd = timeToString(classData['end']);
        var classDayTime = (classDay && classStart && classEnd) ?
            classDay + ' ' + classStart + ' - ' + classEnd :
            '';
    }

    return (
        <Card className="class-card">
            <Card.Body className='class-card-body'>
                <Row>
                    <Col sm={10}>
                        <Card.Title>
                            <b>{classTitle}</b> {classData['name']}
                        </Card.Title>
                        <Card.Text>
                            {classDayTime !== '' && classDayTime}
                            {classDayTime === '' && <i>No listed day or time</i>}
                        </Card.Text>
                        <Card.Link onClick={handleShow} className='more-class-info'>
                            Choose sections...
                        </Card.Link>
                    </Col>
                    <Col sm={2} className='star-container'>
                    </Col>
                </Row>
            </Card.Body>
            <GenerateSectionsModal classData={classData} show={show} setShow={setShow}/>
        </Card>
    );
}

export default GenerateClassCard;