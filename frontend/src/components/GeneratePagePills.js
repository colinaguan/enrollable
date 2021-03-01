import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../style/GeneratePagePill.css';

function GeneratePagePills({ numPages, onPillClick }) {
    const [currentPill, setCurrentPill] = useState(1);

    const onClick = (e) => {
        e.preventDefault();
        // update schedule cards
        const start = currentPill * 10 - 10;
        const end = currentPill * 10 - 1;
        onPillClick(start, end);
        // change selected pill
        setCurrentPill(parseInt(e.target.id, 10));
    }

    // create all buttons
    var pagePills = [];
    for (var page = 1; page <= numPages; page++) {
        // current pill is filled button
        if (page === currentPill)
            pagePills.push(
                <Col md="auto" key={page}>
                    <Button id={page} variant="purple">{page}</Button>
                </Col>
            );
        // other pills are outlined buttons
        else
            pagePills.push(
                <Col md="auto" key={page}>
                    <Button id={page} variant="outline-purple" onClick={onClick}>{page}</Button>
                </Col>
            )
    }

    return (
        <Row className="justify-content-md-center page-pill-container">
            {pagePills}
        </Row>
    );
}

export default GeneratePagePills;