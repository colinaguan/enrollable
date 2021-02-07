import React from 'react';
import { Modal, Container, Row, Col, Card } from 'react-bootstrap';
import { toTitleCase, shortenDays, timeToString, arrayToString } from '../utils/format';
import '../style/ClassSearchModal.css';

function ClassSearchModal({ classData, show, setShow }) {
    const handleClose = () => setShow(false);

    var classTitle = classData['dep'].toUpperCase() + ' ' + classData['code'];
    // will be added when class section is added
    // if (classData['csection'] !== '') classTitle += '-' + classData['csection'];
    var classDay = shortenDays(classData['day']);
    var classStart = timeToString(classData['start']);
    var classEnd = timeToString(classData['end']);

    var classDayTime = (classDay && classStart && classEnd) ?
        classDay + ' ' + classStart + ' - ' + classEnd :
        '';

    var sections = classData['section'].map(data => {
        var secDay = shortenDays(data['day']);
        var secStart = timeToString(data['start']);
        var secEnd = timeToString(data['end']);
        var secDayTime = (secDay && secStart && secEnd) ?
            secDay + ' ' + secStart + ' - ' + secEnd :
            '';
        return (
            <Row key={data['num']} className='row-bottom-pad'>
                <Col sm={4}>
                    {classTitle}-{data['secName']}
                </Col>
                <Col sm={4}>
                    {secDayTime !== '' && secDayTime}
                    {secDayTime === '' && <i>Not stated</i>}
                </Col>
                <Col sm={4}>
                    {data['instructor']}
                </Col>
            </Row>
        )
    })

    return (
        <Modal show={show} onHide={handleClose} animation={false} dialogClassName="info-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    {classTitle} {classData['name']}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <h5 className='section-title'>Class Information</h5>
                    </Row>
                    <Row>
                        <Card className='info-card'>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Time</Col>
                                                <Col sm={8}>
                                                    {classDayTime !== '' && classDayTime}
                                                    {classDayTime === '' && <i>No listed day or time</i>}
                                                </Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Location</Col>
                                                <Col sm={8}>
                                                    {classData['location']}
                                                </Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Type</Col>
                                                <Col sm={8}>
                                                    {toTitleCase(classData['type'])}
                                                </Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>GE</Col>
                                                <Col sm={8}>
                                                    {arrayToString(classData['ge']) || <i>None</i>}
                                                </Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Units</Col>
                                                <Col sm={8}>
                                                    {classData['credits']}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className='info-title'>Requirements</Row>
                                            <Row className='require-text'>Lorem ipsum dolor sit amet...</Row>
                                            <Row className='info-title'>Description</Row>
                                            <Row>Lorem ipsum dolor sit amet...</Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <h5 className='section-title'>Professor Information</h5>
                    </Row>
                    <Row>
                        <Card className='info-card'>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Name</Col>
                                                <Col sm={8}>Patrick Tantalo</Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Easy Rating</Col>
                                                <Col sm={8}>3/5</Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Clarity Rating</Col>
                                                <Col sm={8}>3/5</Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Overall Rating</Col>
                                                <Col sm={8}>3/5</Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className='info-title'>Quality Tags</Row>
                                            <Row>Lorem ipsum dolor sit amet...</Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <h5 className='section-title'>Sections</h5>
                    </Row>
                    <Row>
                        <Card className='info-card'>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Section</Col>
                                                <Col className='info-title' sm={4}>Day and Time</Col>
                                                <Col className='info-title' sm={4}>Instructor</Col>
                                            </Row>
                                            {sections}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default ClassSearchModal;