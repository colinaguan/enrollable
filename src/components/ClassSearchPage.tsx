import React, {useState} from 'react';
import {Card, Modal, Button,Image} from "react-bootstrap"
function ClassSearchPage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
<Card style={{ width: '40rem' }}>

    <Card.Body>

        <Card.Title>Cse1011</Card.Title>
       <Card.Text>MWF10:00-12:00</Card.Text>
        <div>
        <img className="card-img-bottom" src={require('star.png')} alt="Star" />
        </div>
        <Card.Link onClick={handleShow}>more imfor</Card.Link>
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
    </Card.Body>

</Card>

    );
}

export default ClassSearchPage;