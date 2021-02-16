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
            // TODO: route isn't working right now
            fetch('course?course=' + classNum)
            .then(res => res.json())
            .then(data => {
                return
                <GenerateClassCard
                    key={data['num']}
                    id={data['num']}
                    classData={data}
                    selectedClasses={selectedClasses}
                    setSelectedClasses={setSelectedClasses}
                />;
            })
            .catch(() => {
                console.error("classNum API call not responding")
                return;
            });
        });
        setClassCards(cards);
    }, []);

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