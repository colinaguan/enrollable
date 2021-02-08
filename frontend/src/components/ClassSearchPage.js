import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ClassSearchCard from './ClassSearchCard';
import ClassSearchFilters from './ClassSearchFilters';
import { useAuth } from '../contexts/AuthContext';
import '../style/Pages.css';

function ClassSearchPage() {

    // list of departments, ge's, and types
    const [dep, setDep] = useState({});
    const [ge, setGE] = useState([]);
    const [type, setType] = useState([]);
    const [favList, setFavList] = useState([]);

    const { getFavorList } = useAuth();

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
        .catch((error) => { console.log(error) });
        // get types
        fetch('/course/type')
        .then(res => res.json())
        .then(types => {
            setType(types)
        })
        .catch((error) => { console.log(error) });
        // get favorites list
        var newFavList = getFavorList();
        console.log(newFavList);
        setFavList(newFavList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // for debugging
        console.log("---------- FILTERS");
        console.log(fDep);
        console.log(fGE);
        console.log(fType);
        console.log(fFav);
        // API filtering
        var cardData = [];
        
        // TODO: after API fix
        // fetch('course?dep=' + fDep + '&type=' + fType + '&ge=' + fGE)
        // .then(res => res.json())
        // .then(courses => {
        //     cardData = courses.map(data => {
        //         return data;
        //     });
        //     // favorite filter
        //     if (fFav === 'fav') {
        //         console.log('filtering');
        //         cardData.filter(data => data['num'] in favList);
        //     }
        //     // map cards
        //     var cards = cardData.map(data => {
        //         var isFav = data['num'] in favList;
        //         return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
        //             isFav={isFav} favList={favList} setFavList={setFavList}/>;
        //     });
        //     setCards(cards);
        // })
        // .catch(() => {
        //     setCards([])
        // });

        // all courses
        if (fDep === 'any' && fGE === 'any' && fType === 'any') {
            fetch('/course')
            .then(res => res.json())
            .then(courses => {
                cardData = courses.map(data => {
                    return data;
                });
                // favorite filter
                if (fFav === 'fav') {
                    console.log('filtering');
                    cardData.filter(data => data['num'] in favList);
                }
                // map cards
                console.log(cardData);
                var cards = cardData.map(data => {
                    var isFav = data['num'] in favList;
                    return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                        isFav={isFav} favList={favList} setFavList={setFavList}/>;
                });
                setCards(cards);
            })
            .catch(() => {
                setCards([])
            })
        }
        // type
        else if (fDep === 'any' && fGE === 'any' && fType !== 'any') {
            fetch('/course?type=' + fType)
            .then(res => res.json())
            .then(courses => {
                cardData = courses.map(data => {
                    return data;
                });
                // favorite filter
                if (fFav === 'fav') {
                    console.log('filtering');
                    cardData.filter(data => data['num'] in favList);
                }
                // map cards
                var cards = cardData.map(data => {
                    var isFav = data['num'] in favList;
                    return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                        isFav={isFav} favList={favList} setFavList={setFavList}/>;
                });
                setCards(cards);
            })
            .catch(() => {
                setCards([])
            })
        }
        // GE
        else if (fDep === 'any' && fGE !== 'any' && fType === 'any') {
            fetch('course?ge=' + fGE)
            .then(res => res.json())
            .then(courses => {
                cardData = courses.map(data => {
                    return data;
                });
                // favorite filter
                if (fFav === 'fav') {
                    console.log('filtering');
                    cardData.filter(data => data['num'] in favList);
                }
                // map cards
                var cards = cardData.map(data => {
                    var isFav = data['num'] in favList;
                    return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                        isFav={isFav} favList={favList} setFavList={setFavList}/>;
                });
                setCards(cards);
            })
            .catch(() => {
                setCards([])
            })
        }
        // GE and type
        else if (fDep === 'any' && fGE !== 'any' && fType !== 'any') {
            fetch('course?ge=' + fGE + '&type=' + fType)
            .then(res => res.json())
            .then(courses => {
                cardData = courses.map(data => {
                    return data;
                });
                // favorite filter
                if (fFav === 'fav') {
                    console.log('filtering');
                    cardData.filter(data => data['num'] in favList);
                }
                // map cards
                var cards = cardData.map(data => {
                    var isFav = data['num'] in favList;
                    return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                        isFav={isFav} favList={favList} setFavList={setFavList}/>;
                });
                setCards(cards);
            })
            .catch(() => {
                setCards([])
            })
        }
        // dep
        else if (fDep !== 'any' && fGE === 'any' && fType === 'any') {
            fetch('department?dep=' + fDep)
            .then(res => res.json())
            .then(courses => {
                cardData = courses.map(data => {
                    return data;
                });
                // favorite filter
                if (fFav === 'fav') {
                    console.log('filtering');
                    cardData.filter(data => data['num'] in favList);
                }
                // map cards
                var cards = cardData.map(data => {
                    var isFav = favList.includes(data['num']);
                    console.log(data['num']);
                    console.log(isFav);
                    return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                        isFav={isFav} favList={favList} setFavList={setFavList}/>;
                });
                setCards(cards);
            })
            .catch(() => {
                setCards([])
            })
        }
        // dep and type
        else if (fDep !== 'any' && fGE === 'any' && fType !== 'any') {
            fetch('department?dep=' + fDep + '&type=' + fType)
            .then(res => res.json())
            .then(courses => {
                cardData = courses.map(data => {
                    return data;
                });
                // favorite filter
                if (fFav === 'fav') {
                    console.log('filtering');
                    cardData.filter(data => data['num'] in favList);
                }
                // map cards
                var cards = cardData.map(data => {
                    var isFav = data['num'] in favList;
                    return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                        isFav={isFav} favList={favList} setFavList={setFavList}/>;
                });
                setCards(cards);
            })
            .catch(() => {
                setCards([])
            })
        }
        // dep and ge
        else if (fDep !== 'any' && fGE !== 'any' && fType === 'any') {
            fetch('department?dep=' + fDep + '&ge=' + fGE)
            .then(res => res.json())
            .then(courses => {
                cardData = courses.map(data => {
                    return data;
                });
                // favorite filter
                if (fFav === 'fav') {
                    console.log('filtering');
                    cardData.filter(data => data['num'] in favList);
                }
                // map cards
                var cards = cardData.map(data => {
                    var isFav = data['num'] in favList;
                    return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                        isFav={isFav} favList={favList} setFavList={setFavList}/>;
                });
                setCards(cards);
            })
            .catch(() => {
                setCards([])
            })
        }
        // all filters
        else {
            fetch('department?dep=' + fDep + '&type=' + fType + '&ge=' + fGE)
            .then(res => res.json())
            .then(courses => {
                cardData = courses.map(data => {
                    return data;
                });
                // favorite filter
                if (fFav === 'fav') {
                    console.log('filtering');
                    cardData.filter(data => data['num'] in favList);
                }
                // map cards
                var cards = cardData.map(data => {
                    var isFav = data['num'] in favList;
                    return <ClassSearchCard key={data['num']} id={data['num']} classData={data}
                        isFav={isFav} favList={favList} setFavList={setFavList}/>;
                });
                setCards(cards);
            })
            .catch(() => {
                setCards([])
            })
        }
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