import React, {useState} from 'react';
import { Modal, Container, Button, Row, Card, Col } from 'react-bootstrap';
import { shortenDays, timeToString } from '../utils/format';
import '../style/ClassSearchModal.css';

function GenerateScheduleModal({ classList, scheduleTitle, show, setShow, setCardTitle }) {

    const secInclude = [];
    const [title, setTitle] = useState(scheduleTitle);

    //temporary, needs to be passed from generateScheduleCard
    const saveSchedule = () => {
        console.log("Save Schedule");
        handleClose();
    }

    //temporary, needs to be passed from GenerateSchedulesPage to GenerateSchedulesCard to this modal
    const deleteSchedule = () => {
        console.log("Delete Schedule");
        handleClose();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            handleClose();
        }
    }
    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleClose = () => {
        setCardTitle(title);
        setShow(false);
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false} dialogClassName="info-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    <input type="text" value={title}
                        onKeyDown={handleKeyDown} onChange={handleChange}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                    </Row>
                    <Row>
                        <Card className='info-card'>
                            <Card.Body>
                                Need calendar view of schedule
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </Modal.Body>
            <Row>
                <Col>
                    <Button onClick={handleClose} variant="purple">
                        Accept
                    </Button>
                </Col>
                <Col>
                    <Button onClick={saveSchedule} variant="purple">
                        Save
                    </Button>
                </Col>
                <Col>
                    <Button onClock={deleteSchedule}>
                        Delete
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
}

export default GenerateScheduleModal;