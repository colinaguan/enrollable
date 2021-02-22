import React, { useState, useEffect } from 'react';
import { Card, Row, Col} from 'react-bootstrap';
//import { StarFill, Star } from "react-bootstrap-icons";
import { shortenDays, timeToString } from '../utils/format';
// import { useAuth } from '../contexts/AuthContext';
//import GenerateSectionsModal from './GenerateSectionsModal';
//import '../style/GenerateClassCard.css';
//import '../style/GenerateScheduleCard.css';
import '../style/ClassSearchCard.css';

function GenerateScheduleCard({ classList}) {

    console.log("generate Schedules card entered");
    console.log(classList);

    const [classObject, setClassObject] = useState([]);

    useEffect(() => {
        // get d)ata from API
        var scheduleList = classList.map(thisClass => {
            var classObj = {}
            fetch('course/course=' + thisClass.num)
            .then(res => res.json())
            .then(data => {
                classObj.name = data['dep'].toUpperCase() + ' ' + data['code'];
                classObj.num = data['num'];
                classObj.unit = data['credits'];
                classObj.days = shortenDays(data['day']);
                classObj.start = timeToString(data['start']);
                classObj.end = timeToString(data['end']);
                classObj.dayTime = (classObj.days && classObj.start && classObj.end) ?
                                    classObj.days + ' ' + classObj.start + ' - ' + classObj.end :
                                    ' ';                
                var sections = data['sections'].map(section => {
                    var sectionObj = {};
                    sectionObj.num = parseInt(section['num'], 10);
                    sectionObj.days = section['day'];
                    sectionObj.start = section['start'];
                    sectionObj.end = section['end'];
                    return sectionObj;
                });
                
                classObj.sections = sections;
                //test if classObj already exists in classObject
                setClassObject([...classObject, classObj]);
                //return (classObj);
            })
            .catch(() => {
                console.error("classNum API call not responding")
                return;
            })   
        })
    }, [classList]);

    return (
        <Card classname="class-card">
            <Card.Body classname='class-card-body'>
                <Col xs={6}>
                <Card.Title>
                Schedule 1
                </Card.Title>
                <Row>
                      
                    {classObject.map(thisClass => {
                        return(
                                <Row>
                                    
                                    <Col xs={4}>{thisClass.name}</Col>
                                    <Col xs={4}>{thisClass.dayTime}</Col>
                                    <Col xs={4}>{thisClass.sections[0].num}</Col>
                                    
                                </Row>
                        );
                    })}
                </Row>
                </Col>
            </Card.Body>
            <p>View Schedule Modal</p>
        </Card>
    );
}

export default GenerateScheduleCard;