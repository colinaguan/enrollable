import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

function GenerateSchedulesPage({ favList, setFavList }) {

    // classes to display
    const [classCards, setClassCards] = useState([]);
    const [selectClasses, setSelectClasses] = useState([]);

    // filters information
    const [minUnits, setMinUnits] = useState(12);
    const [maxUnits, setMaxUnits] = useState(19);
    const [avoidTimes, setAvoidTimes] = useState([]);

    useEffect(() => {
        // get class data and pass it
        
    }, []);

    return (
        <Container>
            <Row className='page-header'>
                <h1>Generate Schedules</h1>
            </Row>
        </Container>
    );
}

export default GenerateSchedulesPage;