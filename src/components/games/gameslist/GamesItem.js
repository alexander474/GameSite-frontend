import React, {useContext, useState} from 'react';
import GamesUpdateForm from "../gameform/GamesUpdateForm";
import {Button, Card, CardImg, Col, Row} from 'reactstrap';
import axios from "axios";
import {GameContext} from "../../../contexts/GameContext";
import {useHistory} from "react-router-dom";

const GameItem = (prop) => {
    const [edit, setEdit] = useState(false)
    const history = useHistory()

    const deleteGame = () => {
        axios.delete('https://localhost:5001/Game/' + prop.game.gameId).then(res => {
            prop.getGames()
        }).catch(e => {
            console.log("could not add game")
        })
    }

    const adminTools = () => {
        return (
            <Row className="float-right">
                <Col md={12}>
                    <Button onClick={() => deleteGame()} className="ml-1 mr-1" id="userUpdateBtn" color="primary">Delete
                        game</Button>
                    <Button onClick={() => setEdit(!edit)} className="ml-1 mr-1" id="userUpdateBtn" color="primary">Update
                        game</Button>
                </Col>
            </Row>
        )
    }

    const openGame = () => {
        history.push("/game/" + prop.game.gameId)
    }

    if (edit && prop.game) {
        return <GamesUpdateForm game={prop.game} toggle={setEdit}/>
    }

    return (
        <Card body>
            <Row className="m-2">
                <Col md={12}>
                    {prop.game.name} {prop.loggedIn.loggedIn && prop.loggedIn.role === "ADMIN" ? adminTools() : null}
                </Col>
            </Row>
            <Row className="m-2">
                <Col md={6}>
                    {prop.game.images.length > 0 ? (
                            <CardImg top src={"https://localhost:5001/" + prop.game.images[0]}/>) :
                        <h1 className="text-muted">No image</h1>}
                </Col>
                <Col md={6}>
                    <Row className="mt-2 mb-2">
                        <Col md={12}>
                            <p className="text-muted m-0">Description: {prop.game.description}</p>
                        </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                        <Col md={12}>
                            <p className="text-muted m-0">Category: {prop.game.category}</p>
                        </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                        <Col md={12}>
                            <p className="text-muted m-0">Price: {prop.game.price}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="m-2">
                <Col md={12}>
                    <Button onClick={() => openGame()} className="float-right m-1" id="openGameBtn"
                            color="secondary">Open</Button>
                </Col>
            </Row>
        </Card>
    )
}

export default GameItem;