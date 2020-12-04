import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, CardGroup, CardImg, Col, Container, Row} from 'reactstrap';
import {GameContext} from "../contexts/GameContext";
import GameImage from "../components/games/GameImage";
import GameImageUpload from "../components/games/gameform/GameImageUpload";
import CharacterList from "../components/character/CharacterList";
import CharacterCreateForm from "../components/character/characterForm/CharacterCreateForm";
import {useParams} from 'react-router-dom'
import axios from "axios";

const GameInfoPage = (props) => {
    const [games, setGames, getGames] = useContext(GameContext);
    const [game, setGame] = useState(null);
    const [addImageToggle, setAddImageToggle] = useState(false);
    const [addCharacterToggle, setAddCharacterToggle] = useState(false);
    const [characters, setCharacters] = useState([])
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getGame()
        }
    }, [])

    const getGame = () => {
        axios.get("https://localhost:5001/Game/" + id)
            .then(res => {
                setGame(res.data)
                if(res.data && res.data.characterIds){
                    res.data.characterIds.map(  c =>  getCharacter(c))
                }
            })
            .catch(e => {
                setGame(null)
            })
    }

    const getCharacter = (characterId) => {
        axios.get("https://localhost:5001/Character/" + characterId)
            .then(res => {
                characters.push(res.data)
                setCharacters([...characters])
            })
            .catch(e => {
                console.log("Could not get character")
            })
    }


    const adminTools = () => {
        return (
            <Row className="float-right">
                <Col md={12}>
                    <Button onClick={() => {
                        setAddImageToggle(!addImageToggle)
                        getGame()
                    }} className="mb-2 ml-1 mr-1"
                            id="addGameImageBtn" color="primary">{addImageToggle ? "X" : "Add image"}</Button>
                    <Button onClick={() => {
                        setAddCharacterToggle(!addCharacterToggle)
                        getGame()
                    }} className="mb-2 ml-1 mr-1"
                            id="addGameImageBtn" color="primary">{addCharacterToggle ? "X" : "Add character"}</Button>
                </Col>
            </Row>
        )
    }

    if (game === null) {
        return <p>No game with id: {id} found</p>
    }
    return (
        <Container fluid={true}>
            {addImageToggle ? <GameImageUpload toggle={setAddImageToggle} gameId={game.gameId}/> : null}
            {addCharacterToggle ? <CharacterCreateForm toggle={setAddCharacterToggle} gameId={game.gameId}/> : null}
            <Row>
                <Col md={12}>
                    <Card body className="m-5">
                        <Row className="m-2">
                            <Col md={12}>
                                {game.name} {props.loggedIn.loggedIn && props.loggedIn.role === "ADMIN" ? adminTools() : null}
                            </Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={6}>
                                {game.images.length > 0 ? (
                                        <CardImg top src={"https://localhost:5001/" + game.images[0]}/>) :
                                    <h1 className="text-muted">No image</h1>}
                            </Col>
                            <Col md={6}>
                                <Row className="mt-2 mb-2">
                                    <Col md={12}>
                                        <p className="text-muted m-0 font-italic">Id: {game.gameId}</p>
                                    </Col>
                                </Row>
                                <Row className="mt-2 mb-2">
                                    <Col md={12}>
                                        <p className="text-muted m-0">Description: {game.description}</p>
                                    </Col>
                                </Row>
                                <Row className="mt-2 mb-2">
                                    <Col md={12}>
                                        <p className="text-muted m-0">Category: {game.category}</p>
                                    </Col>
                                </Row>
                                <Row className="mt-2 mb-2">
                                    <Col md={12}>
                                        <p className="text-muted m-0">Price: {game.price}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={12}>
                                <p className="text-muted m-0">Game images: </p>
                                <CardGroup>
                                    {game.images.map((image, i) => <GameImage key={i + "wwo"}
                                                                              image={"https://localhost:5001/" + image}/>)}
                                </CardGroup>
                            </Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={12}>
                                <p className="text-muted m-0">Characters: </p>
                                {game.characterIds ? <CharacterList loggedIn={props.loggedIn} getCharacters={getGame} characters={characters}/> : <p>No characters</p>}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default GameInfoPage