import React from 'react';
import { Button } from 'react-bootstrap';
import { shortenDays, timeToString } from '../utils/format';
import '../style/GenerateAvoidTimeLabel.css';

function GenerateAvoidTimeLabel({ days, start, end}){
    return(
        <Button variant="outline-purple" className="constraint-btn">
            {shortenDays(days)} {timeToString(start)}-{timeToString(end)}
        </Button>
    )
}

export default GenerateAvoidTimeLabel;