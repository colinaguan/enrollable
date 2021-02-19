import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { StarFill, Star } from "react-bootstrap-icons";
import { shortenDays, timeToString } from '../utils/format';
// import { useAuth } from '../contexts/AuthContext';
//import GenerateSectionsModal from './GenerateSectionsModal';
import '../style/GenerateClassCard.css';
//import '../style/GenerateSchedulesCard.css';

function GenerateScheduleCard({ classList}) {

    console.log("generate Schedules card entered");

    const [classData, setClassData] = useState({});
    const [sectionPicks, setSecChoices] = useState([]);
    const [classObject, setClassObject] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [priority, setPriority] = useState(1);
    const [favorite, setFav] = useState(true);
    const [show, setShow] = useState(false);
    
    var classNum;

    const handleShow = () => setShow(true);
    const secChoices = (secInclude) => {
        setSecChoices(secInclude);
    }
    useEffect(() => {
        console.log("section choices");
        console.log(sectionPicks);
    }, [sectionPicks]);

    /*
    useEffect(() => {
        // get data from API
        fetch('course/course=' + classNum)
        .then(res => res.json())
        .then(data => {
            //setClassData([...classData, data]);
            // make classObject
            //console.log(data)
            var classObj = {};
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
            setClassObject([...classObject, classObj]);
        })
        .catch(() => {
            console.error("classNum API call not responding")
            return;
        });
    }, [classNum]);
    */

    function getClassInfo( classNum) {
        // get data from API
        fetch('course/course=' + classNum)
        .then(res => res.json())
        .then(data => {
            //setClassData([...classData, data]);
            // make classObject
            //console.log(data)
            var classObj = {};
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
            setClassObject([...classObject, classObj]);
        })
        .catch(() => {
            console.error("classNum API call not responding")
            return;
        });
    };

    //Get class data for each class in lits
    //save in clasObject
    console.log("classList" + classList);
    for (var x in classList){
        //classNum = x.num;
        getClassInfo(x.num);
        console.log("Class Num " + x.num);
    }
    //console.log(classObject);
    var classArray = classObject.map(thisClass => {
        return(
            <Row>
                <Col sm={7}>
                    {thisClass.name}
                    {thisClass.num}
                    {thisClass.dayTime}
                </Col>
            </Row>
        )
    })

    return(
        <Card className="class-card">
            <Card.body className="class-card">
                <Card.title>
                    <b>Schedule 1</b>
                </Card.title>
                <Card.text>
                    <b>Test</b>
                </Card.text>
            </Card.body>
        </Card>
    )

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
                <Row>
                    <Col sm={7}>
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
                </Row>
    );
}

export default GenerateScheduleCard;