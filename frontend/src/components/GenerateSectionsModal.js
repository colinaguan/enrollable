import React, {useState} from 'react';
import { Modal, Container, Row, Col, Card } from 'react-bootstrap';
import { shortenDays, timeToString } from '../utils/format';
import '../style/ClassSearchModal.css';

function GenerateSectionsModal({ classData, show, setShow, secChoices }) {

    const secInclude = [];

    const handleClose = () => {
        secChoices(secInclude);
        setShow(false);
    }
    const handleCheckbox = (event) => {
        //console.log(event.target.id);
        var num = event.target.id;
        var secObj = secInclude.find( obj => {
            if (obj.sec == num){
                return obj;
            }
        });
        if (!secObj){
            console.log("Sec obj not found");
            return
        }
        //console.log(secObj);
        //console.log(num);
        secObj.checked= event.target.checked;
        //console.log(secInclude);
    }

    // check if classData has been updated
    if (classData['num']) {
        
        // class title (ex: CSE 101-01)
        var classTitle = classData['dep'].toUpperCase() + ' ' + classData['code'];
        if (classData['classSection'] !== '01') classTitle += ('-' + classData['classSection']);

        // map section info
        var sections = classData['sections'].map(data => {
            var secDay = shortenDays(data['day']);
            var secStart = timeToString(data['start']);
            var secEnd = timeToString(data['end']);
            var secDayTime = (secDay && secStart && secEnd) ?
                secDay + ' ' + secStart + ' - ' + secEnd :
                '';
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
        });
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false} dialogClassName="info-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    <b>{classTitle}</b> {classData['name']}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
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
                                                <Col classname='info-title' sm={1}></Col>       
                                                <Col className='info-title' sm={3}>Section</Col>
                                                <Col className='info-title' sm={3}>Day and Time</Col>
                                                <Col className='info-title' sm={3}>Instructor</Col>
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

export default GenerateSectionsModal;