import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ClassSearchCard from './ClassSearchCard'
import ClassSearchFilters from './ClassSearchFilters'
import '../style/Pages.css'

function ClassSearchPage() {
    return (
        <Container>
            <Row className='page-header'>
                <h1>Class Search</h1>
            </Row>
            <Row>
                <ClassSearchFilters />
            </Row>
            <Row>
                <ClassSearchCard />
            </Row>
        </Container>
    );
}

export default ClassSearchPage;