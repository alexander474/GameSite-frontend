import React, {useEffect, useState} from 'react';
import CharacterUpdateForm from "./characterForm/CharacterUpdateForm";
import {Button, Card, CardImg, Col, Row} from 'reactstrap';
import axios from "axios";
import {useHistory} from "react-router-dom";

const CharacterItem = (prop) => {
    const [edit, setEdit] = useState(false)
    const history = useHistory()


    const deleteCharacter = () => {
        axios.delete('https://localhost:5001/Character/' + prop.character.characterId).then(res => {
            prop.getCharacters()
        }).catch(e => {
            console.log("could not delete character")
        })
    }

    const adminTools = () => {
        return (
            <Row className="float-right">
                <Col md={12}>
                    <Button onClick={() => deleteCharacter()} className="ml-1 mr-1" id="userUpdateBtn" color="primary">Delete
                        character</Button>
                    <Button onClick={() => setEdit(!edit)} className="ml-1 mr-1" id="userUpdateBtn" color="primary">Update
                        character</Button>
                </Col>
            </Row>
        )
    }

    const openGame = () => {
        history.push("/character/" + prop.character.characterId)
    }

    if (edit && prop.character) {
        return <CharacterUpdateForm character={prop.character} getCharacters={prop.getCharacters} toggle={setEdit}/>
    }

    return (
        <Card body>
            <Row className="m-2">
                <Col md={12}>
                    {prop.character.name} {prop.loggedIn.loggedIn && prop.loggedIn.role === "ADMIN" ? adminTools() : null}
                </Col>
            </Row>
            <Row className="m-2">
                <Col md={6}>
                    {prop.character.images.length > 0 ? (
                            <CardImg top src={"https://localhost:5001/" + prop.character.images[0]}/>) :
                        <h1 className="text-muted">No image</h1>}
                </Col>
                <Col md={6}>
                    <Row className="mt-2 mb-2">
                        <Col md={12}>
                            <p className="text-muted m-0">Description: {prop.character.description}</p>
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

export default CharacterItem;