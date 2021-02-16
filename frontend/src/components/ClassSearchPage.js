import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ClassSearchCard from './ClassSearchCard';
import ClassSearchFilters from './ClassSearchFilters';
import { auth, db } from "../firebase";
import '../style/Pages.css';

function ClassSearchPage() {

    // list of departments, ge's, and types
    const [dep, setDep] = useState({});
    const [ge, setGE] = useState([]);
    const [type, setType] = useState([]);
    const [favList, setFavList] = useState([]);

    // filters
    const [fDep, setFDep] = useState('any');
    const [fGE, setFGE] = useState('any');
    const [fType, setFType] = useState('any');
    const [fFav, setFFav] = useState('any');

    // stores cards
    const [classCards, setCards] = useState([]);

    // store lists of filters
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
        .catch((error) => { console.log(error) });

        // get types
        fetch('/course/type')
        .then(res => res.json())
        .then(types => {
            setType(types)
        })
        .catch((error) => { console.log(error) });

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
    }, []);

    // updates displayed cards after filters are submitted
    const handleFilters = (e) => {
        // prevent page from refreshing
        e.preventDefault();

        // for debugging
        console.log("---------- FILTERS");
        console.log(fDep);
        console.log(fGE);
        console.log(fType);
        console.log(fFav);

        // API filtering
        var cardData = [];
        fetch('department?dep=' + fDep + '&type=' + fType + '&ge=' + fGE)
        .then(res => res.json())
        .then(courses => {
            cardData = courses;
            // favorite filter
            if (fFav === 'fav') {
                cardData = cardData.filter(data => favList.includes(data['num']));
            }
            // map cards
            var cards = cardData.map(data => {
                var isFav = favList.includes(data['num']);
                return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                    isFav={isFav} favList={favList} setFavList={setFavList}/>;
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
            <Row className="sticky-top filter-row">
                <ClassSearchFilters dep={dep} ge={ge} type={type} handleFilters={handleFilters}
                    fDep={fDep} setFDep={setFDep} fGE={fGE} setFGE={setFGE}
                    fType={fType} setFType={setFType} fFav={fFav} setFFav={setFFav}/>
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