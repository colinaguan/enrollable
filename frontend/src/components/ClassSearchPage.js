import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ClassSearchCard from './ClassSearchCard'
import ClassSearchFilters from './ClassSearchFilters'
import '../style/Pages.css'

function ClassSearchPage() {

    // list of departments, ge's, and types
    const [dep, setDep] = useState([]);
    const [ge, setGE] = useState([]);
    const [type, setType] = useState([]);

    // call API and store list of filters
    useEffect(() => {
        setDep(['AMS', 'CSE']);
        setGE(['CC', 'IM']);
        setType(['lecture', 'lab']);
    }, []);

    // filters
    const [fDep, setFDep] = useState('any');
    const [fGE, setFGE] = useState('any');
    const [fType, setFType] = useState('any');
    const [fFav, setFFav] = useState('any');

    // updates displayed cards
    const handleFilters = (e) => {
        e.preventDefault();
        // for debugging
        console.log("---------- FILTERS");
        console.log(fDep);
        console.log(fGE);
        console.log(fType);
        console.log(fFav);
    };

    return (
        <Container>
            <Row className='page-header'>
                <h1>Class Search</h1>
            </Row>
            <Row>
                <ClassSearchFilters dep={dep} ge={ge} type={type} handleFilters={handleFilters}
                    fDep={fDep} setFDep={setFDep} fGE={fGE} setFGE={setFGE}
                    fType={fType} setFType={setFType} fFav={fFav} setFFav={setFFav}/>
            </Row>
            <Row>
                <ClassSearchCard id="cse101" classData={'todo'} isFav={false}/>
            </Row>
        </Container>
    );
}

export default ClassSearchPage;