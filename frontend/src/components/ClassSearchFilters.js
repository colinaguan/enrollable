import React from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
/*To add more eventkey to the dropdown box, use <Dropdown.Item eventKey="1">1</Dropdown.Item>*/
function ClassSearchFilters() {
    return(
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