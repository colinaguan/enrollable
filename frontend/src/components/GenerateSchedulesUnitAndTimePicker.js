import React,{useState} from 'react';
import {Card, Form, Row, Button, Col, FormLabel, FormGroup, Modal} from 'react-bootstrap';
import {Select} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';

import {Label} from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


export default function GenerateSchedulesUnitAndTimePicker() {
    const classes = useStyles();
    const [date, setDate,checkUnit] = useState('');
    const[unit]=useState('')
    let maxUnit,minUnit;
    function setMin(e){
        if(e===''){
            maxUnit=12;
        }else{
            maxUnit=e;
        }
    }
    function setMax(e){
        if(e===''){
            minUnit=19;
        }else{
            minUnit=e;
        }
    }


    const handleChange = (event) => {
        setDate(event.target.value);
    };
    async function handleSubmit(){
        if(maxUnit>19||minUnit>19||maxUnit<12||minUnit<12||maxUnit<minUnit)
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
<Container fixed>

<Row>
    <Col>
                <Row>

                    <Col>
                        <text>Minimum Units</text>
                    <form className={classes.root} noValidate autoComplete="off">
                        <input
                            type="text"
                            id="outline-basic"
                            placeholder="12-19"
                            value={unit}
                            onChange={setMax(this.target.value())}

                        />
                    </form>
                    </Col>
                    <Col>
                        <text>Maximum Units</text>
                        <form className={classes.root} noValidate autoComplete="off">
                            <input
                                type="text"
                                id="outline-basic"
                                placeholder="12-19"
                                value={unit}
                                onChange={setMin(this.target.value())}

                            />
                        </form>
                    </Col>

                </Row>
                <Row>
                    <Col xs="4">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Avoid Meeting</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={date}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>M</MenuItem>
                                <MenuItem value={2}>T</MenuItem>
                                <MenuItem value={3}>TH</MenuItem>
                                <MenuItem value={4}>W</MenuItem>
                                <MenuItem value={5}>F</MenuItem>
                            </Select>
                        </FormControl>
                        </Col>
                    <Col xs="4">

                        <form className={classes.container} noValidate>
                            <TextField
                                id="StartTime"
                                label="From"
                                type="time"
                                defaultValue="00:00"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </form>
                    </Col>
                    <Col xs="4">
                        <form className={classes.container} noValidate>
                            <TextField
                                id="EndTime"
                                label="To"
                                type="time"
                                defaultValue="00:00"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </form>
                    </Col>

                </Row>
    </Col>
    <Col>
    <Button
type="submit"
id="generatePageSearch"
onClick={handleSubmit}
    >Search</Button>
    </Col>
</Row>

</Container>


        </>
    )}
