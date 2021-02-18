import React from 'react';

function GenerateClassCard({ classNum, handleSelectedClasses }) {

    // get data from API
    fetch('course/course=' + classNum)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(() => {
        console.error("classNum API call not responding")
        return;
    });

    return (
        <p>ClassCard</p>
    );
}

export default GenerateClassCard;