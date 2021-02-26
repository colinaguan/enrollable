import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import GenerateClassCard from './GenerateClassCard';
import GenerateFilters from './GenerateFilters';
import GenerateAvoidTimeLabel from './GenerateAvoidTimeLabel';
import '../style/GenerateSchedulesPage.css';

function GenerateSchedulesPage({ favList, setFavList }) {

    // classes to display
    const [classCards, setClassCards] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    // filters information
    const [minUnits, setMinUnits] = useState('12');
    const [maxUnits, setMaxUnits] = useState('25');
    const [avoidTimes, setAvoidTimes] = useState([]);
    const [constraintLabels, setConstraintLabels] = useState([]);

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
    }, [favList]);

    const addConstraint = (day, start, end) => {
        console.log("add constraint: " + day + " " + start + " " + end);
        // add avoid time object
        var avoidTime = {};
        avoidTime.days = [day];
        avoidTime.start = start;
        avoidTime.end = end;
        var newAvoidTimes = avoidTimes;
        newAvoidTimes.push(avoidTime);
        console.log(newAvoidTimes);
        var newConstraintLabels = newAvoidTimes.map((constraint, index) => {
            return (
                <GenerateAvoidTimeLabel
                    key={index}
                    days={constraint.days}
                    start={constraint.start}
                    end={constraint.end}
                />
            );
        });
        setAvoidTimes(newAvoidTimes);
        setConstraintLabels(newConstraintLabels);
    }
    
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
                    addConstraint={addConstraint}
                />
            </Row>
            <Row className='constraint-row'>
                {constraintLabels}
                {/* <GenerateAvoidTimeLabel key={4} day="Monday" start="08:00" end="10:00"/>
                <GenerateAvoidTimeLabel key={5} day="Wednesday" start="08:00" end="10:00"/> */}
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