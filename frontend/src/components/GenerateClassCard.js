import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { StarFill, Star } from "react-bootstrap-icons";
import { shortenDays, timeToString } from '../utils/format';
// import { useAuth } from '../contexts/AuthContext';
import GenerateSectionsModal from './GenerateSectionsModal';
import '../style/GenerateClassCard.css';

function GenerateClassCard({ classNum, favList, setFavList, handleSelectedClasses }) {

    const [classData, setClassData] = useState({});

    const [favorite, setFav] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // get data from API
        fetch('course/course=' + classNum)
        .then(res => res.json())
        .then(data => {
            setClassData(data);
        })
        .catch(() => {
            console.error("classNum API call not responding")
            return;
        });       
    }, [classNum]);

    // TODO: fix firestore
    // const { addToFavorList, removeFromFavorList } = useAuth();
    const handleFav = () => {
        var newFavList = []
        if (favorite) {
            // make new favorites list
            newFavList = favList;
            const index = newFavList.indexOf(classData['num']);
            if (index > -1) {
                newFavList.splice(index, 1);
            }
            // set values for hooks and firestore
            setFav(false);
            // removeFromFavorList(classData['num']);
            setFavList(newFavList);
        }
        else {
            // make new favorites list
            newFavList = favList;
            newFavList.push(classData['num']);
            // set values for hooks and firestore
            setFav(true);
            // addToFavorList(classData['num']);
            setFavList(newFavList);
        }
    };

    // check if data has been updated
    if (classData['num']) {
        // class title (ex: CSE 101-01)
        var classTitle = classData['dep'].toUpperCase() + ' ' + classData['code'];
        if (classData['classSection'] !== '01') classTitle += '-' + classData['classSection'];
        // class day time info
        var classDay = shortenDays(classData['day']);
        var classStart = timeToString(classData['start']);
        var classEnd = timeToString(classData['end']);
        var classDayTime = (classDay && classStart && classEnd) ?
            classDay + ' ' + classStart + ' - ' + classEnd :
            '';
    }

    return (
        <Card className="class-card">
            <Card.Body className='class-card-body'>
                <Row>
                    <Col sm={1}>
                        <label className='checkbox-container'>
                            <input type="checkbox"/>
                            <span class="checkmark"></span>
                        </label>
                    </Col>
                    <Col sm={9}>
                        <Card.Title>
                            <b>{classTitle}</b> {classData['name']}
                        </Card.Title>
                        <Card.Text>
                            {classDayTime !== '' && classDayTime}
                            {classDayTime === '' && <i>No listed day or time</i>}
                        </Card.Text>
                        <Card.Link onClick={handleShow} className='more-class-info'>
                            Choose sections...
                        </Card.Link>
                    </Col>
                    <Col sm={2} className='star-container'>
                        {favorite &&
                        <StarFill className='star' width={'40'} height={'40'} onClick={handleFav}/>
                        }
                        {!favorite &&
                        <Star className='star' width={'40'} height={'40'} onClick={handleFav}/>
                        }
                    </Col>
                </Row>
            </Card.Body>
            <GenerateSectionsModal classData={classData} show={show} setShow={setShow}/>
        </Card>
    );
}

export default GenerateClassCard;