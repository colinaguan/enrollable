import React from 'react';
import {Form, Button, Col, Modal } from 'react-bootstrap';
import '../style/GenerateFilters.css'

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // if(firstTime>secondTime)
        // {
        //     handleShow();
        // }
    }

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // should make a function called onMinMaxUnitChange()
        // if min < max: setShow(true)
        // else: setShow(false)
    // use the react-bootstrap Alert component instead of a modal for the error message

    return(
        <Form className='filter-form' onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm={6} controlId="formMinUnit">
                    <Form.Label>Minimum Units</Form.Label>
                    {/* make the input type "text" so user can manually input numbers (can check if input is a number in onMinMaxUnitChange() function) */}
                    <Form.Control className='filter-minUnit-dropdown' as="select" value={minUnits} onChange={(e) => setMinUnits(e.target.value)}>
                        <option value='12'>12</option>
                        <option value='13'>13</option>
                        <option value='14'>14</option>
                        <option value='15'>15</option>
                        <option value='16'>16</option>
                        <option value='17'>17</option>
                        <option value='18'>18</option>
                        <option value='19'>19</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={6} controlId="formMaxUnit">
                    <Form.Label>Maximum Units</Form.Label>
                    <Form.Control className='filter-maxUnit-dropdown' as="select" value={maxUnits} onChange={(e)=>setMaxUnits(e.target.value)}>
                        <option value='12'>12</option>
                        <option value='13'>13</option>
                        <option value='14'>14</option>
                        <option value='15'>15</option>
                        <option value='16'>16</option>
                        <option value='17'>17</option>
                        <option value='18'>18</option>
                        <option value='19'>19</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm={5} controlId="formDatePick">
                    <Form.Label>Date</Form.Label>
                    {/* <Form.Control className='filter-date-picker' as="select" value={date} onChange={(e)=>pickDate(e.target.value)}> */}
                    <Form.Control className='filter-date-picker' as="select">
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
                    <Form.Control className='first-time-picker' type="time"/>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="secondTime">
                    <Form.Label>To</Form.Label>
                    {/* <Form.Control className='second-time-picker' type="time" value={secondTime} onChange={(e)=>pickSecondTime(e.target.value)}/> */}
                    <Form.Control className='second-time-picker' type="time"/>
                </Form.Group>
                {/* clicking "add" should add the day/time constraint to avoidTimes */}
                <Form.Group as={Col} sm={1} className='filters-button' controlId="formFavorites">
                    <Button variant="purple" type="submit">
                        Add
                    </Button>
                </Form.Group>
                {/* need to display avoidTimes as labels (see mockup for example) */}
            </Form.Row>
            <Form.Row>
                <Button type="submit">Submit</Button>
            </Form.Row>
            {/* use the react-bootstrap Alert component instead of a modal */}
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please type in number between 12 and 19 again</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
)}

export default GenerateFilters;