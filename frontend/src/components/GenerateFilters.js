import React, {useState} from 'react';
import {Form, Button, Col, Modal, ButtonGroup} from 'react-bootstrap';
import '../style/GenerateFilters.css'
import Alert from "react-bootstrap/Alert";
import {useFormControl} from "@material-ui/core";
import {shortenDays} from "../utils/format";

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

    const [date, pickDate] = useState('');
    const [firstTime, pickFirstTime] = useState('');
    const [secondTime, pickSecondTime] = useState('');
    const [constraintLabels, setConstraintLabels] = useState([date, firstTime, secondTime]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setConstraintLabels(date,firstTime,secondTime);
        setAvoidTimes(constraintLabels);
        newLabel(constraintLabels);
        return(avoidTimes);
    }
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // TODO: checking min and max unit constraints on change needs to be removed
    // ex: if I want to type in "10" for max, and "12" is min,
    //   - type in "1"
    //   - error shows
    //   - cannot type anymore
    function onMinUnitChange(e){
        if(maxUnits < minUnits) {
            handleShow();
        }
        else{
            handleClose();
            setMinUnits(parseInt(e.target.value, 10));
        }
    }

    function onMaxUnitChange(e){
        if (maxUnits < minUnits) {
            handleShow();
        }
        else {
            handleClose();
            setMaxUnits(parseInt(e.target.value, 10));
        }
    }

    function newLabel(){
        let x;
        x=shortenDays(date);
        return(
            <Button variant="outline-light">{x} {firstTime}--{secondTime}</Button>
        )
    }
    return(
        <Form className='filter-form' onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm={6} controlId="formMinUnit">
                    <Form.Label>Minimum Units</Form.Label>
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
                    <Form.Control className='first-time-picker' type="time" value={firstTime} onChange={(e)=>pickFirstTime(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="secondTime">
                    <Form.Label>To</Form.Label>
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
        <newLabel/>
          </Form.Row>
            <Alert show={show} variant="danger">
                <Alert.Heading>Please type in number again</Alert.Heading>
                <p>
                    Invalid Min and Max Units: minimum units should be less than or equal to the maximum units
                </p>
            </Alert>
        </Form>
    )}


export default GenerateFilters;