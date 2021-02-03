import React, { useState } from 'react';
import { Form, Button, Col } from "react-bootstrap";
import '../style/ClassSearchFilters.css';

function ClassSearchFilters({ dep, ge, type }) {

    const [fDep, setDep] = useState('any');
    const [fGE, setGE] = useState('any');
    const [fType, setType] = useState('any');
    const [fFav, setFav] = useState('any');

    // for debugging
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("---------- FILTERS");
        console.log(fDep);
        console.log(fGE);
        console.log(fType);
        console.log(fFav);
    };

    // create option elements from props
    var depOptions = dep.map((elem) => {
        return <option key={elem} value={elem}>{elem}</option>;
    });
    var geOptions = ge.map((elem) => {
        return <option key={elem} value={elem}>{elem}</option>;
    });
    var typeOptions = type.map((elem) => {
        return <option key={elem} value={elem}>{elem}</option>;
    });
    
    return (
        <Form className='filter-form' onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm={3} controlId="formDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Control className='filter-dropdown' as="select" value={fDep} onChange={(e) => setDep(e.target.value)}>
                        <option value='any'>Any Department</option>
                        {depOptions}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="formGE">
                    <Form.Label>GE</Form.Label>
                    <Form.Control className='filter-dropdown' as="select" value={fGE} onChange={(e) => setGE(e.target.value)}>
                        <option value='any'>Any GE</option>
                        {geOptions}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="formClassType">
                    <Form.Label>Class Type</Form.Label>
                    <Form.Control className='filter-dropdown' as="select" value={fType} onChange={(e) => setType(e.target.value)}>
                        <option value='any'>Any Class Type</option>
                        {typeOptions}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="formFavorites">
                    <Form.Label>Favorites</Form.Label>
                    <Form.Control className='filter-dropdown' as="select" value={fFav} onChange={(e) => setFav(e.target.value)}>
                        <option value='any'>All Classes</option>
                        <option value='fav'>My Favorites</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={1} className='filters-button' controlId="formFavorites">
                    <Button variant="purple" type="submit">
                        Search
                    </Button>
                </Form.Group>
            </Form.Row>
        </Form>
    );
}

export default ClassSearchFilters;