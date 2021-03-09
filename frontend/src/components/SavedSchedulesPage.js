import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SavedScheduleCard from './SavedScheduleCard';
import  { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
function SavedSchedulesPage() {
    // {savedSchedules}
    // var schedules = [];
    const [schedules, setSchedules] = useState([]);

    const {getSavedSchedules} = useAuth();

    useEffect( () =>{
        setSchedules(getSavedSchedules());
    }, []);
    //var schedules = getSavedSchedules();

    /*
    var savedSchedules= [
        {
            "title": "backup",
            "description": "good",
            "classes": [
                {
                    "num": 12345, // for key?
                    "title": "CSE 101",
                    "dayTime": "TuTh 1:30PM - 3:05PM",
                    "sections": [
                        {
                            "num": 23456,
                            "title": "1A",
                            "dayTime": "TuTh 1:30PM - 3:05PM"
                        }
     
                    ]
                }, 
                {
                    "num": 22345, 
                    "title": "CSE 102",
                    "dayTime": "Mon 1:30PM - 3:05PM",
                    "sections": [
                        {
                            "num": 33456,
                            "title": "1A",
                            "dayTime": "TuTh 1:30PM - 3:05PM"
                        },
                        {
                            "num": 33457,
                            "title": "1B",
                            "dayTime": "TuTh 1:30PM - 3:05PM"
                        }
     
                    ]
                },
            ]
        },
        {
            "title": "optimal",
            "description": "perfect",
            "classes": [
                {
                    "num": 12345, // for key?
                    "title": "CSE 101",
                    "dayTime": "TuTh 1:30PM - 3:05PM",
                    "sections": [
                        {
                            "num": 23456,
                            "title": "1A",
                            "dayTime": "TuTh 1:30PM - 3:05PM"
                        }
     
                    ]
                }, 
                {
                    "num": 22345, 
                    "title": "CSE 102",
                    "dayTime": "Mon 1:30PM - 3:05PM",
                    "sections": [
                        {
                            "num": 33456,
                            "title": "1A",
                            "dayTime": "TuTh 1:30PM - 3:05PM"
                        }
     
                    ]
                },
            ]
        }
    ]
    */
    
    // const [scheduleCards, setCards] = useState([]);
    var cards = schedules.map((schedule, index) => {
        
        return (
          <SavedScheduleCard
            key={index}
            id={index}
            title={schedule.title}
            description={schedule.description}
            classes={schedule.classes}
           />
        );
    });
    
    // setCards(cards);

    return (
        <Container>
            <Row className='page-header'>
                <h1>Saved Schedules</h1>
            </Row>
            <Row>
                { 
                    cards && cards.length > 0 ? 
                    cards :
                    <p><i>No schedules to display. Go generate some schedules:)</i></p>
                }
            </Row>
        </Container>
    );
}

export default SavedSchedulesPage;