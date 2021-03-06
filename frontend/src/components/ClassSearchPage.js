import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import ClassSearchCard from './ClassSearchCard';
import ClassSearchFilters from './ClassSearchFilters';
import '../style/Pages.css';

function ClassSearchPage({ favList, setFavList }) {
    // list of favorite classes
    const { getFavorList } = useAuth();

    // term
    const [term, setTerm] = useState('N/A');

    // list of departments, ge's, and types
    const [dep, setDep] = useState({});
    const [ge, setGE] = useState([]);
    const [type, setType] = useState([]);

    // filters
    const [fDep, setFDep] = useState('any');
    const [fGE, setFGE] = useState('any');
    const [fType, setFType] = useState('any');
    const [fFav, setFFav] = useState('any');

    // stores cards
    const [classCards, setCards] = useState([]);

    // store lists of filters
    useEffect(() => {
        // get term
        fetch('/api/course/term')
        .then(res => res.json())
        .then(term => {
            setTerm(term.term);
        })
        .catch((error) => { console.log(error) })

        // get departments
        fetch('/api/department/details')
        .then(res => res.json())
        .then(departments => {
            setDep(departments);
        })
        .catch((error) => { console.log(error) });

        // get GE
        fetch('/api/course/ge')
        .then(res => res.json())
        .then(ges => {
            setGE(Object.keys(ges));
        })
        .catch((error) => { console.log(error) });

        // get types
        fetch('/api/course/type')
        .then(res => res.json())
        .then(types => {
            setType(types)
        })
        .catch((error) => { console.log(error) });

        // set favList
        setFavList(getFavorList());
    }, []);

    // updates displayed cards after filters are submitted
    const handleFilters = (e) => {
        // prevent page from refreshing
        e.preventDefault();

        // API filtering
        fetch('/api/department?dep=' + fDep + '&type=' + fType + '&ge=' + fGE)
        .then(res => res.json())
        .then(courses => {
            var cardData = courses;
            // favorite filter
            if (fFav === 'fav') {
                cardData = cardData.filter(data => favList.includes(data['num']));
            }
            // map cards
            var cards = cardData.map(data => {
                var isFav = favList.includes(data['num']);
                return (
                    <ClassSearchCard
                        key={data['num']}
                        id={data['num']}
                        classData={data}
                        isFav={isFav}
                        favList={favList}
                        setFavList={setFavList}
                    />
                );
            });
            setCards(cards);
        })
        .catch(() => {
            setCards([])
        })
    };

    return (
        <Container>
            <Row className='page-header'>
                <h1>Class Search</h1>
            </Row>
            <Row>
                <i>Data provided by the SlugSurvival API</i>
            </Row>
            <Row>
                <i>Current Term: {term}</i>
            </Row>
            <Row className="sticky-top filter-row">
                <ClassSearchFilters
                    dep={dep}
                    ge={ge}
                    type={type}
                    handleFilters={handleFilters}
                    fDep={fDep}
                    setFDep={setFDep}
                    fGE={fGE}
                    setFGE={setFGE}
                    fType={fType}
                    setFType={setFType}
                    fFav={fFav}
                    setFFav={setFFav}
                />
            </Row>
            <Row>
                {
                    classCards && classCards.length > 0 ?
                    classCards :
                    <p><i>No classes to display. Set filters and click 'Search' to update.</i></p>
                }
            </Row>
        </Container>
    );
}

export default ClassSearchPage;