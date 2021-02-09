import React, {useState, Component} from 'react';
import {
    Card,
    Modal,
    Button,
    Navbar,
    Nav,
    FormControl,
    Form,
    Dropdown,
    DropdownButton,
    SplitButton,
    ButtonGroup, Container, Col,Row
} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";
import {default as Menu} from 'react-burger-menu';
let starStatus=0;
let colorsGroup=['#FDF001','#808080']
function cards(){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Card style={{ width: '40rem' }}>

            <Card.Body>

                <Card.Title>Cse1011</Card.Title>
                <Card.Text>MWF10:00-12:00


                    <StarFill.Link fill={'#FDF001'} type="button" width={'50'} height={'50'} id={'StarIcon'} onClick={this.fill='#808080'}
                    >

                    </StarFill.Link>

                </Card.Text>

                {/*<div>*/}
                {/*<img className="card-img-bottom" src={require('star.png')} alt="Star" />*/}
                {/*</div>*/}

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
function NavBar(){
    return(
        <>
    <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">enrollable</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/">Class Search</Nav.Link>
            <Nav.Link href="/">Generate</Nav.Link>
            <Nav.Link href="/">Saved Schedules</Nav.Link>
            <Nav.Link className="text-right" href="/">log out</Nav.Link>
        </Nav>
    </Navbar>
</>);
}
function SideBarLeft(){
    return(
        <Card style={{ width: '10rem',height:'100rem' }}>
<menu bg="light">
    <p><a id="home" className="menuitem" href="/">Home</a></p>
    <p><a id="home" className="menuitem" href="/">Home</a></p>
    <p><a id="home" className="menuitem" href="/">Home</a></p>
    <p><a id="home" className="menuitem" href="/">Home</a></p>
</menu>
        </Card>
    );
}
function DropDown(){
    return(
        <>
            <Container>
                <Row className="justify-content-lg-center">
                {['Department','GE','Class Type','Favorite'].map((idx)=>(
                    <>
                    <Col md="auto">{idx}
                    <p>
                    <DropdownButton
                    as={ButtonGroup}
                    key={idx}
                    id="dropdown-${idx}"
                    variant="light"
                    title={idx}
                    >
                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                    </DropdownButton>
                    </p>
                    </Col>
                    </>
                ))}
                    <Col sm={1}><Button>Search</Button></Col>
                </Row>
            </Container>
        </>
    );
}

function ClassSearchPage() {
    return(
        <>
        <NavBar/>
        <div>
            <h1 className="text-center">Class Search</h1>
            <Row>
            <Col><DropDown/></Col>
            </Row>
        </div>
        </>
    );


}
function changeStarColor(obj){

    // document.getElementById('StarIcon').style.fill='#808080';


}

// function changeStarColor(){
//  if(starStatus%2===1){
//      document.getElementById('Star').background='#808080';
//      starStatus=starStatus+1
//  }
//  if(starStatus%2===0){
//      document.getElementById('Star').background='#FDF001';
//      starStatus=starStatus+1
//  }
// }

export default ClassSearchPage;
