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
    const schedulesPerPage = 1;
    const [generated, setGenerated] = useState(false);
    // replaced state with variable since this variable needs to be updated quickly
    var schedules = [];
    const [pagePills, setPagePills] = useState([]);
    const [scheduleCards, setScheduleCards] = useState([]);

    const updateScheduleCards = (start, end) => {
        // TODO: post-generation setup; update scheduleCards
        console.log(start);
        console.log(end);
        const cards = [];
        for (var index = start; index <= end; index++) {
            console.log(start, schedules.length);
            // stop loop if index goes out of bounds
            if (index >= schedules.length)
                break;
            console.log("creating card");
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
        if (parseInt(maxUnits, 10) < parseInt(minUnits, 10)) {
            setFilterError(true);
            return;
        }
        else {
            setGenerated(true);
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
            // (repeat of updateScheduleCards, but state hasn't been updated so this is a temp solution)
            const cards = [];
            for (var index = 0; index < schedulesPerPage; index++) {
                if (index >= generatedSchedules.length)
                    break;
                cards.push(
                    <GenerateScheduleCard
                        key={index+1}
                        id={index+1}
                        classList={generatedSchedules[index]}
                        scheduleNumber={index+1}
                    />
                );
            }
            setScheduleCards(cards);
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
            {pagePills}
            <Row>
                {scheduleCards}
            </Row>
        </Container>
    );
}

export default GenerateSchedulesPage;