import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ClassSearchCard from './ClassSearchCard';
import ClassSearchFilters from './ClassSearchFilters';
import '../style/Pages.css';

function ClassSearchPage() {

    // list of departments, ge's, and types
    const [dep, setDep] = useState({});
    const [ge, setGE] = useState([]);
    const [type, setType] = useState([]);

    // call API and store list of filters
    useEffect(() => {
        // get departments
        fetch('/department/details')
            .then(res => res.json())
            .then(departments => {
                setDep(departments);
            })
            .catch((error) => { console.log(error) });
        // get GE
        fetch('/course/ge')
            .then(res => res.json())
            .then(ges => {
                setGE(Object.keys(ges));
            })
            .catch((error) => { console.log(error) })
        // get types
        fetch('/course/type')
            .then(res => res.json())
            .then(types => {
                setType(types)
            })
            .catch((error) => { console.log(error) })
    }, []);

    // filters
    const [fDep, setFDep] = useState('any');
    const [fGE, setFGE] = useState('any');
    const [fType, setFType] = useState('any');
    const [fFav, setFFav] = useState('any');

    // stores cards
    const [classCards, setCards] = useState();

    // updates displayed cards after filters are submitted
    const handleFilters = (e) => {
        // prevent page from refreshing
        e.preventDefault();
        // temporary card assignment
        setCards(<ClassSearchCard id="cse101" classData={'todo'} isFav={false}/>);
        // for debugging
        console.log("---------- FILTERS");
        console.log(fDep);
        console.log(fGE);
        console.log(fType);
        console.log(fFav);
        console.log(classCards);
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
                {classCards ? classCards : <p><i>No classes to display. Set filters and click 'Search' to update.</i></p>}
            </Row>
        </Container>
    );
}

export default ClassSearchPage;