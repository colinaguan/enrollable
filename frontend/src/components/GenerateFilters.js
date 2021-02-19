import React, {useState} from 'react';
import {Form, Button, Col, Modal } from 'react-bootstrap';
import '../style/GenerateFilters.css'
import Alert from "react-bootstrap/Alert";
import {useFormControl} from "@material-ui/core";

function GenerateFilters({
                             minUnits,
                             setMinUnits,
                             maxUnits,
                             setMaxUnits,
                             avoidTimes,
                             setAvoidTimes,
                             // date,
                             // pickDate,
                             // firstTime,
                             // pickFirstTime,
                             // secondTime,
                             // pickSecondTime
                         }) {

    // undefined variables (these should be declared in this function, not in the props):
    // date, pickDate, firstTime, pickFirstTime, secondTime, pickSecondTime
    const [date,pickDate]=useState('');
    const [firstTime,pickFirstTime]=useState('');
    const [secondTime,pickSecondTime]=useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // should make a function called onMinMaxUnitChange()
    // if min < max: setShow(true)
    // else: setShow(false)
    // use the react-bootstrap Alert component instead of a modal for the error message
    function onMinUnitChange(e){
        setMinUnits(e.target.value)
        if(maxUnits<minUnits){handleShow();setMinUnits(12)}
        else{handleClose();}
    }
    function onMaxUnitChange(e){
        setMaxUnits(e.target.value)
        if(maxUnits<minUnits){handleShow();setMaxUnits(25)}
        else{handleClose();}
    }
    return(
        <Form className='filter-form' onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm={6} controlId="formMinUnit">
                    <Form.Label>Minimum Units</Form.Label>
                    {/* make the input type "text" so user can manually input numbers (can check if input is a number in onMinMaxUnitChange() function) */}
                    <Form.Control className='filter-minUnit-dropdown' type="text" value={minUnits}  onChange={onMinUnitChange}>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={6} controlId="formMaxUnit">
                    <Form.Label>Maximum Units</Form.Label>
                    <Form.Control className='filter-maxUnit-dropdown' type="text" value={maxUnits} onChange={onMaxUnitChange}>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm={5} controlId="formDatePick">
                    <Form.Label>Date</Form.Label>
                    {/* <Form.Control className='filter-date-picker' as="select" value={date} onChange={(e)=>pickDate(e.target.value)}> */}
                    <Form.Control className='filter-date-picker' as="select" value={date} onChange={(e)=>pickDate(e.target.value)}>
                        <option value={0}>Sunday</option>
                        <option value={1}>Monday</option>
                        <option value={2}>Tuesday</option>
                        <option value={3}>Wednesday</option>
                        <option value={4}>Thursday</option>
                        <option value={5}>Friday</option>
                        <option value={6}>Saturday</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="firstTime">
                    <Form.Label>From</Form.Label>
                    {/* <Form.Control className='first-time-picker' type="time" value={firstTime} onChange={(e)=>pickFirstTime(e.target.value)}/> */}
                    <Form.Control className='first-time-picker' type="time" value={firstTime} onChange={(e)=>pickFirstTime(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="secondTime">
                    <Form.Label>To</Form.Label>
                    {/* <Form.Control className='second-time-picker' type="time" value={secondTime} onChange={(e)=>pickSecondTime(e.target.value)}/> */}
                    <Form.Control className='second-time-picker' type="time" value={secondTime} onChange={(e)=>pickSecondTime(e.target.value)}/>
                </Form.Group>
                {/* clicking "add" should add the day/time constraint to avoidTimes */}
                <Form.Group as={Col} sm={1} className='filters-button' controlId="formFavorites">
                    <Button variant="purple" type="submit" onClick={handleSubmit}>
                        Add
                    </Button>
                </Form.Group>
                {/* need to display avoidTimes as labels (see mockup for example) */}
                {/*its looks like we should add small card?*/}
            </Form.Row>
            <Form.Row>
            </Form.Row>
            {/* use the react-bootstrap Alert component instead of a modal */}
            <Alert show={show} variant="danger">
                <Alert.Heading>Please type in number again</Alert.Heading>
                <p>
                    Invalid Min and Max Units: minimum units should be less than or equal to the maximum units
                </p>
            </Alert>
        </Form>
    )}


export default GenerateFilters;