import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, CardGroup, CardImg, Col, Container, Row} from 'reactstrap';
import {GameContext} from "../contexts/GameContext";
import GameImage from "../components/games/GameImage";
import GamesList from "../components/games/gameslist/GamesList";
import CharacterCreateForm from "../components/character/characterForm/CharacterCreateForm";
import {useParams} from 'react-router-dom'
import axios from "axios";
import CharacterImageUpload from "../components/character/characterForm/CharacterImageUpload";

const CharacterInfoPage = (props) => {
    const [character, setCharacter] = useState(null);
    const [addImageToggle, setAddImageToggle] = useState(false);
    const [games, setGames] = useState([])
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getCharacter()
        }
    }, [])

    const getCharacter = () => {
        axios.get("https://localhost:5001/Character/" + id)
            .then(res => {
                setCharacter(res.data)
                if(res.data && res.data.gameIds){
                    res.data.gameIds.map(  g =>  getGame(g))
                }
            })
            .catch(e => {
                setCharacter(null)
            })
    }

    const getGame = (gameId) => {
        axios.get("https://localhost:5001/Game/" + gameId)
            .then(res => {
                games.push(res.data)
                setGames([...games])
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
                        getCharacter()
                    }} className="mb-2 ml-1 mr-1"
                            id="addGameImageBtn" color="primary">{addImageToggle ? "X" : "Add image"}</Button>
                </Col>
            </Row>
        )
    }

    if (character === null) {
        return <p>No character with id: {id} found</p>
    }
    return (
        <Container fluid={true}>
            {addImageToggle ? <CharacterImageUpload toggle={setAddImageToggle} getCharacters={getCharacter} characterId={character.characterId}/> : null}
            <Row>
                <Col md={12}>
                    <Card body className="m-5">
                        <Row className="m-2">
                            <Col md={12}>
                                {character.name} {props.loggedIn.loggedIn && props.loggedIn.role === "ADMIN" ? adminTools() : null}
                            </Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={6}>
                                {character.images.length > 0 ? (
                                        <CardImg top src={"https://localhost:5001/" + character.images[0]}/>) :
                                    <h1 className="text-muted">No image</h1>}
                            </Col>
                            <Col md={6}>
                                <Row className="mt-2 mb-2">
                                    <Col md={12}>
                                        <p className="text-muted m-0 font-italic">Id: {character.characterId}</p>
                                    </Col>
                                </Row>
                                <Row className="mt-2 mb-2">
                                    <Col md={12}>
                                        <p className="text-muted m-0">Description: {character.description}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={12}>
                                <p className="text-muted m-0">Character images: </p>
                                <CardGroup>
                                    {character.images.map((image, i) => <GameImage key={i + "wwo"}
                                                                              image={"https://localhost:5001/" + image}/>)}
                                </CardGroup>
                            </Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={12}>
                                <p className="text-muted m-0">Games: </p>
                                {character.gameIds ? <GamesList loggedIn={props.loggedIn} getGames={getCharacter} games={games}/> : <p>No games</p>}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CharacterInfoPage