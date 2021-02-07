import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { StarFill, Star } from "react-bootstrap-icons";
import ClassSearchModal from './ClassSearchModal';
import { shortenDays, timeToString } from '../utils/format';
import '../style/ClassSearchCard.css';

function ClassSearchCard({ classData, isFav }) {

    const [favorite, setFav] = useState(isFav);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleFav = () => {
        // sets favorite
        favorite ? setFav(false) : setFav(true);
        // access Firestore
    };

    var classTitle = classData['dep'].toUpperCase() + ' ' + classData['code'];
    // will be added when class section is added
    // if (classData['csection'] !== '') classTitle += '-' + classData['csection'];
    var classDay = shortenDays(classData['day']);
    var classStart = timeToString(classData['start']);
    var classEnd = timeToString(classData['end']);

    var classDayTime = (classDay && classStart && classEnd) ?
        classDay + ' ' + classStart + ' - ' + classEnd :
        '';

    return (
        <Card className="class-card">
            <Card.Body className='class-card-body'>
                <Row>
                    <Col sm={10}>
                        <Card.Title>
                            <b>{classTitle}</b> {classData['name']}
                        </Card.Title>
                        <Card.Text>
                            {classDayTime !== '' && classDayTime}
                            {classDayTime === '' && <i>No listed day or time</i>}
                        </Card.Text>
                        <Card.Link onClick={handleShow} className='more-class-info'>
                            More class information...
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
            <ClassSearchModal classData={classData} show={show} setShow={setShow}/>
        </Card>
    );
}

export default ClassSearchCard;