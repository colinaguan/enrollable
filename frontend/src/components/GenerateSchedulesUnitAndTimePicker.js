import React from 'react';
import { Form, Button, Col, Modal} from 'react-bootstrap';
 function GenerateSchedulesUnitAndTimePicker({
                                                               handleFilters,
                                                               minUnit,
                                                               maxUnit,
                                                               setMinUnit,
                                                               setMaxUnit,
                                                               date,
                                                               pickDate,
                                                               firstTime,
                                                               pickFirstTime,
                                                               secondTime,
                                                               pickSecondTime,
                                                           }) {
    async function handleSubmit(){
        if(firstTime>secondTime)
        {
            handleShow();
        }
    }

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
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
<Form className='filter-form' onSubmit={handleFilters}>
    <Form.Row>
    <Form.Row>
        <Form.Group as={Col} sm={3} controlId="formMinUnit">
            <Form.Label>MinUnit</Form.Label>
            <Form.Control className='filter-minUnit-dropdown' as="select" value={minUnit} onChange={(e)=>setMinUnit(e.target.value)}>
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
        <Form.Group as={Col} sm={3} controlId="formMaxUnit">
            <Form.Label>MaxUnit</Form.Label>
            <Form.Control className='filter-maxUnit-dropdown' as="select" value={maxUnit} onChange={(e)=>setMaxUnit(e.target.value)}>
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
        <Form.Group as={Col} sm={3} controlId="formDatePick">
            <Form.Lable>date</Form.Lable>
            <Form.Control className='filter-date-picker' as="select" value={date} onChange={(e)=>pickDate(e.target.value)}>
                <option value={1}>M</option>
                <option value={2}>T</option>
                <option value={3}>TH</option>
                <option value={4}>W</option>
                <option value={5}>F</option>
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
    </Form.Row>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </Form.Row>
</Form>


        </>
    )}
export default GenerateSchedulesUnitAndTimePicker;