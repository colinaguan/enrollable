import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import GenerateClassCard from './GenerateClassCard';
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
    const [schedules, setSchedules] = useState([]);
    const [pagePills, setPagePills] = useState([]);
    const [scheduleCards, setScheduleCards] = useState([]);

    const onPillClick = (start, end) => {
        // TODO: post-generation setup; update scheduleCards
        console.log(start);
        console.log(end);
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
            <Row>
                {
                    classCards && classCards.length > 0 ?
                    classCards :
                    <i>No favorites selected; please go to the Class Search page to favorite classes.</i>
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