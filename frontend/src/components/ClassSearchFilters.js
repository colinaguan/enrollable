import React, { useState } from 'react';
import { Form, Button, Col } from "react-bootstrap";
import '../style/ClassSearchFilters.css';

function ClassSearchFilters() {

    const [department, setDep] = useState('any');
    const [ge, setGE] = useState('any');
    const [type, setType] = useState('any');
    const [favorites, setFav] = useState('any');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("---------- FILTERS");
        console.log(department);
        console.log(ge);
        console.log(type);
        console.log(favorites);
    };
    
    return (
        <Form className='filter-form' onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm={3} controlId="formDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select" value={department} onChange={(e) => setDep(e.target.value)}>
                        <option value='any'>Any Department</option>
                        <option>CSE</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="formGE">
                    <Form.Label>GE</Form.Label>
                    <Form.Control as="select" value={ge} onChange={(e) => setGE(e.target.value)}>
                        <option value='any'>Any GE</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="formClassType">
                    <Form.Label>Class Type</Form.Label>
                    <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value='any'>Any Class Type</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="formFavorites">
                    <Form.Label>Favorites</Form.Label>
                    <Form.Control as="select" value={favorites} onChange={(e) => setFav(e.target.value)}>
                        <option value='any'>All Classes</option>
                        <option>My Favorites</option>
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