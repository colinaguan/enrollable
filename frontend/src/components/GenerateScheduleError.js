import React from 'react';
import { Row, Alert } from 'react-bootstrap';
import '../style/GenerateSchedulesPage.css';

function GenerateScheduleError({ conflicts }) {

    const pairs = conflicts.map((conflict) => {
        return (
            <p>
                {conflict[0].title}, {conflict[1].title}
            </p>
        );
    });

    return(
        <Row>
            <Alert variant="danger" className='gen-alert-err'>
                <Alert.Heading>
                    No possible schedules can be made with given constraints.
                </Alert.Heading>
                {
                    pairs && pairs.length > 0 &&
                    <p>
                        Conflicting Classes:
                    </p>
                }
                {
                    pairs && pairs.length > 0 &&
                    pairs
                }
            </Alert>
        </Row>
    );
}

export default GenerateScheduleError;