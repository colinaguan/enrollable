import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import GenerateClassCard from './GenerateClassCard';
import GenerateFilters from './GenerateFilters';
import GeneratePagePills from './GeneratePagePills';
import '../style/GenerateSchedulesPage.css';

function GenerateSchedulesPage({ favList, setFavList }) {

    // filters information
    const [minUnits, setMinUnits] = useState(12);
    const [maxUnits, setMaxUnits] = useState(19);
    const [avoidTimes, setAvoidTimes] = useState([]);

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