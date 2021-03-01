import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
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

    // favorited classes to display
    const [classCards, setClassCards] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    // schedules to display
    const [schedules, setSchedules] = useState([]);
    const [pagePills, setPagePills] = useState([]);
    const [scheduleCards, setScheduleCards] = useState([]);

    const onPillClick = (start, end) => {
        // TODO: post-generation setup; update scheduleCards
        console.log(start);
        console.log(end);
    }

    const handleGenerate = () => {
        if (parseInt(maxUnits, 10) < parseInt(minUnits, 10)) {
            setFilterError(true);
            return;
        }
        else {
            console.log(selectedClasses);
            var generateRequest = {};
            generateRequest.minUnits = minUnits;
            generateRequest.maxUnits = maxUnits;
            generateRequest.avoidTimes = avoidTimes;
            generateRequest.classes = selectedClasses;
            // TODO: implement API generate route
            // fetch('generate', {
            //     method: 'GET',
            //     body: generateRequest
            // })
            // .then(res => res.json())
            // .then(schedules => {
            //     console.log(schedules);
            // });
            // TODO: will be moved to .then statement and modified when API call is fixed
            setPagePills(<GeneratePagePills numPages={4} onPillClick={onPillClick}/>);

            //Output Result from API generate route
            //Currently outputs all selected classes to test schedules card
            /*
            var cards = selectedClasses.map(classObject => {
                return (
                    <GenerateScheduleCard
                        key={classObject.num}
                        id={classObject.num}
                        classNum={classObject.num}
                    />
                );
            });
            */

            //Current list of generated schedules is 
            //a single schedule containing all selected classes
            //repeated twice to show multiple schedules
            //until schedule generation is complete
            var generatedSchedules = [];
            generatedSchedules[0] = selectedClasses;
            generatedSchedules[1] = selectedClasses;
            var scheduleNumber = 0;
            var sCards = generatedSchedules.map(schedule => {
                scheduleNumber += 1;
                return (
                    <GenerateScheduleCard
                        key={scheduleNumber}
                        id={scheduleNumber}
                        classList={schedule}
                        scheduleNumber={scheduleNumber}
                    />  
                );
            }); 
            setScheduleCards(sCards);
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
                    filterError={filterError}
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
            <Row>
                <Button className='generate-button' variant="purple" onClick={handleGenerate}>
                    Generate
                </Button>
            </Row>
            {pagePills}
            <Row>
                {scheduleCards}
            </Row>
        </Container>
    );
}

export default GenerateSchedulesPage;