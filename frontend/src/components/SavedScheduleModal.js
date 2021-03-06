import React, {useState} from 'react';
import { Modal, Container, Button, Row, Card, Col, Form } from 'react-bootstrap';
import '../style/GenerateScheduleModal.css';

function SavedScheduleModal({
    title,
    description,
    modalClasses,
    show,
    setShow,
    setCardTitle,
    setCardDescription,
    saveSchedule,
    deleteSchedule
}) {
    // classList: classes in schedule
    const [modalTitle, setTitle] = useState(title);
    const [modalDescription, setDescription] = useState(description);
    // const scheduleData = {};

    const handleTitle = (event) => {
        setTitle(event.target.value);
        setCardTitle(event.target.value);
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
        setCardDescription(event.target.value);
    }

    //update in firestore
    const handleSave = () => {
        setCardTitle(modalTitle);
        setCardDescription(modalDescription);
        // console.log("Save Schedule");
        // scheduleData.title = title;
        // scheduleData.description = description;
        // console.log(scheduleData);
        saveSchedule();
        handleClose();
    }

    const handleClose = () => {
        // setCardTitle(title);
        setShow(false);
    }
    const handleDelete = () => {
        deleteSchedule();
        // delete from firestore
        handleClose();
        
    }

    //replaced by schedule-info
    const scheduleCards = modalClasses.map(thisClass => {
        return (
            <Card key={thisClass.num} className='schedule-info-card'>
                <Card.Title>
                    <b>{thisClass.title}</b> {thisClass.dayTime}
                </Card.Title>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                {
                                    thisClass.sections.length === 0 &&
                                    <i>No sections to display</i>
                                }
                                {
                                    thisClass.sections.length > 0 &&
                                    <Row className='row-bottom-pad'>     
                                        <Col className='info-title' sm={6}>Section</Col>
                                        <Col className='info-title' sm={6}>Day and Time</Col>
                                    </Row>
                                }
                                {
                                    thisClass.sections.length > 0 &&
                                    thisClass.sections.map(data => {
                                        // Array of inclusion status for each section
                                        return (
                                            <Row key={data.num} className='row-bottom-pad'>
                                                <Col sm={6}>
                                                    {thisClass.title}-{data.title}
                                                </Col>
                                                <Col sm={6}>
                                                    {data.dayTime !== '' && data.dayTime}
                                                    {data.dayTime === '' && <i>Not stated</i>}
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    })

    return (
        <Modal show={show} onHide={handleClose} animation={false} dialogClassName="schedule-info-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Card className='schedule-info-card'>
                            <Card.Title>
                                <b>Schedule Information</b>
                            </Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="schedTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={modalTitle} onChange={handleTitle}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="schedDesc">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" value={modalDescription} onChange={handleDescription}>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                        {scheduleCards}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleDelete} variant="outline-purple">
                    Delete
                </Button>
                <Button onClick={handleSave} variant="purple">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SavedScheduleModal;