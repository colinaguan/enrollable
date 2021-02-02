import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { StarFill, Star } from "react-bootstrap-icons";
import ClassSearchModal from './ClassSearchModal';
import '../style/ClassSearchCard.css'

function ClassSearchCard({ classData, isFav }) {

    const [favorite, setFav] = useState(isFav);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleFav = () => {
        // sets favorite
        if (favorite) setFav(false);
        else setFav(true);
        // access Firestore
        console.log(classData);
    };

    return (
        <Card className="class-card">
            <Card.Body className='class-card-body'>
                <Row>
                    <Col sm={10}>
                        <Card.Title>
                            <b>CSE 101-01</b> Intro to Algorithms
                        </Card.Title>
                        <Card.Text>
                            MWF 10:00AM - 12:00PM
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