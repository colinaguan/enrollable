import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Alert } from 'react-bootstrap';
import GenerateClassCard from './GenerateClassCard';
import GenerateScheduleCard from './GenerateScheduleCard';
import GenerateFilters from './GenerateFilters';
import GenerateAvoidTimeLabel from './GenerateAvoidTimeLabel';
import GeneratePagePills from './GeneratePagePills';
import '../style/GenerateSchedulesPage.css';

function GenerateSchedulesPage({ favList, setFavList }) {

    // filters information
    const [minUnits, setMinUnits] = useState('12');
    const [maxUnits, setMaxUnits] = useState('25');
    const [avoidTimes, setAvoidTimes] = useState([]);
    const [constraintLabels, setConstraintLabels] = useState([]);
    const [filterError, setFilterError] = useState(false);
    const [filterErrMessage, setFilterErrMessage] = useState('');

    // favorited classes to display
    const [classCards, setClassCards] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    // schedules to display
    const schedulesPerPage = 1;
    const [generated, setGenerated] = useState(false);
    const [generatedError, setGenErr] = useState('');
    // replaced state with variable since this variable needs to be updated quickly
    var schedules = [];
    const [pagePills, setPagePills] = useState([]);
    const [scheduleCards, setScheduleCards] = useState([]);

    // updates schedule cards to display
    const updateScheduleCards = (start, end) => {
        const cards = [];
        for (var index = start; index <= end; index++) {
            // stop loop if index goes out of bounds
            if (index >= schedules.length)
                break;
            // create card
            cards.push(
                <GenerateScheduleCard
                    key={index+1}
                    id={index+1}
                    classList={schedules[index]}
                    scheduleNumber={index+1}
                />
            );
        }
        setScheduleCards(cards);
    }

    const handleGenerate = () => {
        if (filterError) {
            return;
        }
        else if (parseInt(maxUnits, 10) < parseInt(minUnits, 10)) {
            setFilterError(true);
            setFilterErrMessage('Maximum units must be greater than or equal to minimum units.');
            return;
        }
        else {
            setFilterError(false);
            console.log("in generate");
            console.log(avoidTimes);
            setGenerated(true);
            // console.log(selectedClasses);
            var generateRequest = {};
            generateRequest.minUnits = parseInt(minUnits, 10);
            generateRequest.maxUnits = parseInt(maxUnits, 10);
            generateRequest.avoidTimes = avoidTimes;
            generateRequest.classes = selectedClasses;
            console.log(generateRequest);
            // TODO: implement API generate route
            fetch('generate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(generateRequest)
            })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                // no possible schedules
                // NOTE: API currently only returns the successful attribute when it fails
                if (!response.successful) {
                    console.log("unsuccessful");
                    setGenErr('No possible schedules can be made with given constraints.')
                }
                // display schedules
                // NOTE: API currently only returns array of schedules when generation is successful
                else {
                    // reset error message
                    setGenErr('');

                    // store new schedules
                    const generatedSchedules = response.schedules;
                    schedules = generatedSchedules;

                    const remainder = generatedSchedules.length % schedulesPerPage;
                    const numPills = remainder > 0 ?
                        generatedSchedules.length / schedulesPerPage + 1 :
                        generatedSchedules.length / schedulesPerPage;
                    
                    setPagePills(
                        <GeneratePagePills
                            numPages={numPills}
                            schedulesPerPage={schedulesPerPage}
                            defaultPill={1}
                            updateScheduleCards={updateScheduleCards}
                        />
                    );
                    // set first page
                    updateScheduleCards(0, schedulesPerPage - 1);
                }
            });
        }
    }

    // render cards from favorites
    useEffect(() => {
        // updates class data
        const handleSelectedClasses = (action, classObject) => {
            var tempClasses = selectedClasses;
            if (action === 'add') {
                if (selectedClasses.indexOf(classObject) === -1) {
                    tempClasses.push(classObject);
                    setSelectedClasses(tempClasses);
                }
                else {
                    console.error('handleSelectedClasses: add: class exists');
                }
            }
            else if (action === 'mod') {
                const index = selectedClasses.indexOf(classObject);
                if (index !== -1) {
                    tempClasses.splice(index, 1);
                    tempClasses.push(classObject);
                    setSelectedClasses(tempClasses);
                }
                else {
                    console.error('handleSelectedClasses: mod: nonexistent class')
                }
            }
            else if (action === 'rm') {
                const index = selectedClasses.indexOf(classObject);
                if (index !== -1) {
                    tempClasses.splice(index, 1);
                    setSelectedClasses(tempClasses);
                }
                else {
                    console.error('handleSelectedClasses: rm: nonexistent class')
                }
            }
            else {
                console.error('handleSelectedClasses: uncaught action');
            }
        }
        // get class data and pass to cards
        var cards = favList.map(classNum => {
            return (
                <GenerateClassCard
                    key={classNum}
                    id={classNum}
                    classNum={classNum}
                    favList={favList}
                    setFavList={setFavList}
                    handleSelectedClasses={handleSelectedClasses}
                />
            );
        });
        setClassCards(cards);
    }, [favList, setFavList, selectedClasses]);

    // for constraints: remove constraint when constraint is clicked
    const removeConstraint = (days, start, end) => {
        // remove given constraint
        var newAvoidTimes = avoidTimes.slice(0)
        newAvoidTimes = newAvoidTimes.filter(constraint => {
            const sameDay = constraint.days[0] === days[0];
            const sameStart = constraint.start === start;
            const sameEnd = constraint.end === end;
            return !(sameDay && sameStart && sameEnd);
        });
        console.log(newAvoidTimes);
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
        if (start === '' || end === '') {
            setFilterError(true);
            setFilterErrMessage('Empty start or end time');
            return;
        }
        else if (end < start) {
            setFilterError(true);
            setFilterErrMessage('The end time for an avoided time should be after the start time.');
            return;
        }
        else {
            // check if constraint is a duplicate
            const duplicateCheck = avoidTimes.filter(constraint => {
                const sameDay = constraint.days[0] === day;
                const sameStart = constraint.start === start;
                const sameEnd = constraint.end === end;
                return sameDay && sameStart && sameEnd;
            });
            if (duplicateCheck.length > 0) {
                setFilterError(true);
                setFilterErrMessage('Duplicate time to avoid.');
                return;
            }
            // no errors
            setFilterError(false);
            // create new avoid time object
            var avoidTime = {};
            avoidTime.days = [day];
            avoidTime.start = start;
            avoidTime.end = end;
            // add avoid time object
            var newAvoidTimes = avoidTimes.slice(0);
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
                    filterError={filterError}
                    filterErrMessage={filterErrMessage}
                />
            </Row>
            <Row className='constraint-row'>
                {constraintLabels}
            </Row>
            <Row className='select-classes-text'>
                <h3>Please select classes to consider in generation</h3>
            </Row>
            <Row>
                {
                    classCards && classCards.length > 0 ?
                    classCards :
                    <i className="placeholder-favorites">
                        No favorites selected; go to the Class Search page to favorite classes
                    </i>
                }
            </Row>
            <Row>
                <Button className='generate-button' variant="purple" onClick={handleGenerate}>
                    Generate
                </Button>
            </Row>
            {
                generated &&
                <Row>
                    <h1>Results</h1>
                </Row>
            }
            {
                generated &&
                <Row>
                    <p>Choose which schedules to save</p>
                </Row>
            }
            {
                generated && generatedError !== '' &&
                <Row>
                    <Alert variant="danger">{generatedError}</Alert>
                </Row>
            }
            {pagePills}
            <Row>
                {scheduleCards}
            </Row>
        </Container>
    );
}

export default GenerateSchedulesPage;