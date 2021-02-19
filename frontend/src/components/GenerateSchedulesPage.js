import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import GenerateClassCard from './GenerateClassCard';
import GenerateScheduleCard from './GenerateScheduleCard';
import GenerateFilters from './GenerateFilters';
import '../style/GenerateSchedulesPage.css';

function GenerateSchedulesPage({ favList, setFavList }) {

    // filters information
    const [minUnits, setMinUnits] = useState(12);
    const [maxUnits, setMaxUnits] = useState(19);
    const [avoidTimes, setAvoidTimes] = useState([]);

     // favorited classes to display
     const [classCards, setClassCards] = useState([]);
     const [selectedClasses, setSelectedClasses] = useState([]);

    const [scheduleCards, setScheduleCards] = useState([]); 

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
        // });

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

        //Current list of generate schedules is all selected classes
        //until schedule generation is done
        var generatedSchedules = [selectedClasses];
        var sCards = generatedSchedules.map(schedule => {
            return (<GenerateScheduleCard
                        key={1}
                        id={1}
                        classList={selectedClasses}
                    />  
            );
        });                    
        setScheduleCards(sCards);
    }

    useEffect(() => {
        /*
        * @param {string} action
        * @param {object} classObject
        */
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
            <Row>
                {
                    scheduleCards && scheduleCards.length > 0 ?
                    scheduleCards :
                    <p>No schedules generated</p>
                }
            </Row>
        </Container>
    );
}

export default GenerateSchedulesPage;