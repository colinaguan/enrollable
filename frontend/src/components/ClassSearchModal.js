import React from 'react';
import { Modal, Container, Row, Col, Card } from 'react-bootstrap';
import '../style/ClassSearchModal.css';

function ClassSearchModal({ classData, show, setShow }) {
    const handleClose = () => setShow(false);
    return (
        <Modal show={show} onHide={handleClose} animation={false} dialogClassName="info-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    CSE 101-01 Intro to Algorithms
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
                                                <Col sm={8}>MWF 9:20AM - 10:25AM</Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Location</Col>
                                                <Col sm={8}>Remote Instruction</Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Type</Col>
                                                <Col sm={8}>Lecture</Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>GE</Col>
                                                <Col sm={8}>N/A</Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col className='info-title' sm={4}>Units</Col>
                                                <Col sm={8}>5</Col>
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
                                            <Row className='row-bottom-pad'>
                                                <Col sm={4}>CSE101-01A</Col>
                                                <Col sm={4}>MWF 4:00PM - 5:00PM </Col>
                                                <Col sm={4}>Unknown</Col>
                                            </Row>
                                            <Row className='row-bottom-pad'>
                                                <Col sm={4}>CSE101-01A</Col>
                                                <Col sm={4}>MWF 4:00PM - 5:00PM </Col>
                                                <Col sm={4}>Unknown</Col>
                                            </Row>
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