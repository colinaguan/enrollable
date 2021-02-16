import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { auth, db } from "../firebase";

function GenerateSchedulesPage() {

    // classes to display
    const [favList, setFavList] = useState([]);
    const [classCards, setClassCards] = useState([]);

    // filters information
    const [minUnits, setMinUnits] = useState(12);
    const [maxUnits, setMaxUnits] = useState(19);
    const [avoidTimes, setAvoidTimes] = useState([]);

    const [selectClasses, setSelectClasses] = useState([]);

    useEffect(() => {
        // get favorites list (copied from AuthContext)
        var docRef = db.collection("users").doc(auth.currentUser.uid);
        var list = [];
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("favorites retrieved");
                list = doc.data().favorList;
                setFavList(list);
            } else {
                console.error("favorites document dne");
                setFavList([]);
            }
        }).catch(() => {
            console.error("favorites not found");
            setFavList([]);
        });
        // get class data and pass it
        
    }, []);

    return (
        <Container>
            <Row className='page-header'>
                <h1>Generate Schedules</h1>
            </Row>
        </Container>
    );
}

export default GenerateSchedulesPage;