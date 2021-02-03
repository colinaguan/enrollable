import React from 'react';
import { Form, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import '../style/ClassSearchFilters.css';
/*To add more eventkey to the dropdown box, use <Dropdown.Item eventKey="1">1</Dropdown.Item>*/

function ClassSearchFilters() {
    const handleSubmit = (event) => {
        const form = event.currentTarget;
    };
    
    return (
        <Form className='filter-form'>
            <Form.Row>
                <Form.Group as={Col} sm={3} controlId="formDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select">
                        <option>Any Department</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="formGE">
                    <Form.Label>GE</Form.Label>
                    <Form.Control as="select">
                        <option>None</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="formClassType">
                    <Form.Label>Class Type</Form.Label>
                    <Form.Control as="select">
                        <option>Any Class Type</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="formFavorites">
                    <Form.Label>Favorites</Form.Label>
                    <Form.Control as="select">
                        <option>All Classes</option>
                        <option>My Favorites</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={1} className='filters-button' controlId="formFavorites">
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Form.Group>
            </Form.Row>
        </Form>
    );
}

function Dropdowns() {
    return (
        <Container>
            <Row className="justify-content-lg-center">
                {['Department'].map((idx)=>(
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
                {['GE'].map((idx)=>(
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
                {['ClassType'].map((idx)=>(
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
                {['Favorites'].map((idx)=>(
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
    );
}

export default ClassSearchFilters;