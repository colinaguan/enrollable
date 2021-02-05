import React from 'react';
import {Card, Container, Form, Row,Button,Col,FormLabel,FormControl,FormGroup} from 'react-bootstrap';
import {Select} from "@material-ui/core";
import {Label} from "@material-ui/icons";

function GenerateSchedulesUnitAndTimePicker(){
    return(
        <>
<Container>


                <Row>

                    <Col>
                        <text>Minimum Units</text>
                    <FormGroup controlId="integer">

                        <FormControl type="MinUnit" placeholder="12-19" />
                    </FormGroup>
                    </Col>
                    <Col>
                        <text>Maximum Units</text>
                    <FormGroup controlId="integer">

                        <FormControl type="MaxUnit" placeholder="12-19" />
                    </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <text>Avoid Meeting on</text>
                <Select>

                    <option>MWF</option>
                    <option>TW</option>
                </Select>
                        </Col>
                    <Col>

                        <FormGroup controlId="StartTime">
                            <FormLabel>From</FormLabel>
                            <FormControl type="time"  />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup controlId="StartTime">
                            <FormLabel>To</FormLabel>
                            <FormControl type="time"  />
                        </FormGroup>
                    </Col>

                </Row>


</Container>


        </>
    );
}
export default GenerateSchedulesUnitAndTimePicker;