import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ClassSearchCard from './ClassSearchCard'
import ClassSearchFilters from './ClassSearchFilters'
import '../style/Pages.css'

function ClassSearchPage() {

    const [dep, setDep] = useState([]);
    const [ge, setGE] = useState([]);
    const [type, setType] = useState([]);

    // call API and store list of filters
    useEffect(() => {
        setDep(['AMS', 'CSE']);
        setGE(['CC', 'IM']);
        setType(['lecture', 'lab']);
    }, []);

    return (
        <Container>
            <Row className='page-header'>
                <h1>Class Search</h1>
            </Row>
            <Row>
                <ClassSearchFilters dep={dep} ge={ge} type={type}/>
            </Row>
            <Row>
                <ClassSearchCard id="cse101" classData={'todo'} isFav={false}/>
            </Row>
        </Container>
    );
}

export default ClassSearchPage;