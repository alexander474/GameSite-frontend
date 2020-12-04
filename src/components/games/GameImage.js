import React from 'react';
import {Col, Row} from 'reactstrap';

const GameImage = (prop) => {
    if (prop.image !== null) {
        console.log()
        return (
            <Col>
                <Row md={12}>
                    <img src={prop.image}/>
                </Row>
            </Col>
        )
    } else {
        return null
    }
}

export default GameImage;