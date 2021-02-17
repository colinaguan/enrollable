import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import GenerateClassCard from './GenerateClassCard';
import GenerateFilters from './GenerateFilters';

function GenerateSchedulesPage({ favList, setFavList }) {

    // classes to display
    const [classCards, setClassCards] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    // filters information
    const [minUnits, setMinUnits] = useState(12);
    const [maxUnits, setMaxUnits] = useState(19);
    const [avoidTimes, setAvoidTimes] = useState([]);

    useEffect(() => {
        // get class data and pass to cards
        var cards = favList.map(classNum => {
            return (
                <GenerateClassCard
                    key={classNum}
                    id={classNum}
                    classNum={classNum}
                />
            );
        });
        setClassCards(cards);
    }, [favList, handleSelectedClasses]);

    return (
        <Container>
            <Row className='page-header'>
                <h1>Generate Schedules</h1>
            </Row>
            <Row>
                <GenerateFilters
                    minUnits={minUnits}
                    setMinUnits={setMinUnits}
                    maxUnits={maxUnits}
                    setMaxUnits={setMaxUnits}
                    avoidTimes={avoidTimes}
                    setAvoidTimes={setAvoidTimes}
                />
            </Row>
            <Row>
                {
                    classCards && classCards.length > 0 ?
                    classCards :
                    <p>No favorites selected, or API is not working</p>
                }
            </Row>
        </Container>
    );
}

export default GenerateSchedulesPage;