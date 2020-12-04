import React from 'react'
import {Card, Col, Container, Row} from 'reactstrap';
import {useHistory} from "react-router-dom";

const HomePage = (props) => {
    const history = useHistory()

    return (
        <Container fluid={true}>
            <Row className="mb-4">
                <Col sm="12">
                    <Card body>
                        <Row>
                            <Col md={6}>
                                <h3>Welcome to this page!</h3>
                                <p className="mt-0 mb-0">You are currently logged in as <span className="text-danger">{props.loggedIn.role}</span></p>
                                <p className="mt-0 mb-0">You can easily see admin features by pressing "change to admin" in the header</p>
                                <p className="mt-0 mb-0">Role is stored in state and will therefore disappear when refresh or when state is lost by other reason</p>
                            </Col>
                            <Col md={6}>
                                <h4 className="mt-0 mb-0">How to use this site:</h4>
                                <ol>
                                    <li>First remember to check that you're admin ref: see you're header</li>
                                    <li>Add a new game</li>
                                    <li>Open the new game and add a image</li>
                                    <li>Add an character to the game</li>
                                    <li>Open the new character and add a image</li>
                                    <li>Now you should have a new game with one character</li>
                                </ol>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Card onClick={()=>history.push("/games")} style={{cursor:"pointer"}} className="pt-5 pb-5" body>
                        <p className="text-center">See games</p>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card onClick={()=>history.push("/characters")} style={{cursor:"pointer"}} className="pt-5 pb-5" body>
                        <p className="text-center">See characters</p>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage