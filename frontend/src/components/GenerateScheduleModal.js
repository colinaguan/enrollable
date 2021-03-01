import React, {useState} from 'react';
import { Modal, Container, Button, Row, Card, Col } from 'react-bootstrap';
// import { shortenDays, timeToString } from '../utils/format';
import '../style/GenerateScheduleModal.css';

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

    const handleCheckbox = () => {

    }

    const classCards = classList.map(thisClass => {
        return (
            <Card className='schedule-info-card'>
                <Card.Title>
                    <b>{thisClass.title}</b> {thisClass.dayTime}
                </Card.Title>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Row className='row-bottom-pad'>
                                    <Col className='info-title' sm={1}></Col>       
                                    <Col className='info-title' sm={3}>Section</Col>
                                    <Col className='info-title' sm={3}>Day and Time</Col>
                                    <Col className='info-title' sm={3}>Instructor</Col>
                                </Row>
                                {/* {
                                    thisClass.sections.map(data => {
                                        var secDay = shortenDays(data['day']);
                                        var secStart = timeToString(data['start']);
                                        var secEnd = timeToString(data['end']);
                                        var secDayTime = (secDay && secStart && secEnd) ?
                                            secDay + ' ' + secStart + ' - ' + secEnd :
                                            '';
                                        //Array of inclusion status for each section
                                        secInclude.push({sec: data['num'], checked: true});
                                        return (
                                            <Row key={data['num']} className='row-bottom-pad'>
                                                <Col sm={1}>
                                                    <input  
                                                        type="checkbox" 
                                                        name="include"
                                                        id={data['num']}
                                                        defaultChecked="true"
                                                        onChange={handleCheckbox}
                                                    />
                                                </Col>
                                                <Col sm={3}>
                                                    {classTitle}-{data['secName']}
                                                </Col>
                                                <Col sm={3}>
                                                    {secDayTime !== '' && secDayTime}
                                                    {secDayTime === '' && <i>Not stated</i>}
                                                </Col>
                                                <Col sm={3}>
                                                    {data['instructor']}
                                                </Col>
                                                
                                            </Row>
                                        )
                                    })
                                } */}
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
                    <input type="text" value={title}
                        onKeyDown={handleKeyDown} onChange={handleChange}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {classCards}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={saveSchedule} variant="purple">
                    Save
                </Button>
                <Button onClick={deleteSchedule} variant="outline-purple">
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GenerateScheduleModal;