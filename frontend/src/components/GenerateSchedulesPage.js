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

    // for constraints: remove constraint when constraint is clicked
    const removeConstraint = (days, start, end) => {
        // remove given constraint
        var newAvoidTimes = avoidTimes;
        newAvoidTimes = newAvoidTimes.filter(constraint => {
            const sameDay = constraint.days === days;
            const sameStart = constraint.start === start;
            const sameEnd = constraint.end === end;
            return !(sameDay && sameStart && sameEnd);
        });
        // update constraint labels
        var newConstraintLabels = newAvoidTimes.map((constraint, index) => {
            return (
                <GenerateAvoidTimeLabel
                    key={index}
                    days={constraint.days}
                    start={constraint.start}
                    end={constraint.end}
                    removeConstraint={removeConstraint}
                />
            );
        });
        // update states
        setAvoidTimes(newAvoidTimes);
        setConstraintLabels(newConstraintLabels);
    }

    // for filters: adds a time constraint label and avoid time object
    const addConstraint = (day, start, end) => {
        // add avoid time object
        var avoidTime = {};
        avoidTime.days = [day];
        avoidTime.start = start;
        avoidTime.end = end;
        var newAvoidTimes = avoidTimes;
        newAvoidTimes.push(avoidTime);
        // set new constraint labels
        var newConstraintLabels = newAvoidTimes.map((constraint, index) => {
            return (
                <GenerateAvoidTimeLabel
                    key={index}
                    days={constraint.days}
                    start={constraint.start}
                    end={constraint.end}
                    removeConstraint={removeConstraint}
                />
            );
        });
        // update states
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