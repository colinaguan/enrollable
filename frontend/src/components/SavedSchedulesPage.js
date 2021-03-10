import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SavedScheduleCard from './SavedScheduleCard';
import  { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

function SavedSchedulesPage() {

    const [schedules, setSchedules] = useState([]);
    const [cards, setCards] = useState([]);

    const {getSavedSchedules} = useAuth();

    useEffect( () => {
        const newScheds = getSavedSchedules();
        setSchedules(newScheds);
        console.log(newScheds);
        var cards = newScheds.map((schedule, index) => {
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
        setCards(cards);
    }, []);

    return (
        <Container>
            <Row className='page-header'>
                <h1>Saved Schedules</h1>
            </Row>
            <Row>
                { 
                    cards && cards.length > 0 ? 
                    cards :
                    <p><i>No schedules to display. Go generate some schedules :)</i></p>
                }
            </Row>
        </Container>
    );
}

export default SavedSchedulesPage;