import React, { useState } from 'react';
import { Card, Modal, Button, Row, Col } from 'react-bootstrap';
import { StarFill } from "react-bootstrap-icons";
import '../style/ClassSearchCard.css'

function ClassSearchCard() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Card className="class-card">
            <Card.Body className='class-card-body'>
                <Row>
                    <Col sm={10}>
                        <Card.Title>
                            <b>CSE 101-01</b> Intro to Algorithms
                        </Card.Title>
                        <Card.Text>
                            MWF 10:00AM - 12:00PM
                        </Card.Text>
                        <Card.Link onClick={handleShow}>
                            More class information...
                        </Card.Link>
                    </Col>
                    <Col sm={2} className='star-container'>
                        <StarFill width={'40'} height={'40'}/>
                    </Col>
                </Row>
            </Card.Body>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default ClassSearchCard;