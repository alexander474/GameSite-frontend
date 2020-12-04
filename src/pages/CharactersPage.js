import React, {useState, useEffect} from 'react'
import CharacterList from "../components/character/CharacterList";
import GameCreateForm from "../components/games/gameform/GameCreateForm";
import {Button, Col, Container, Input, Row} from 'reactstrap';
import {GameContext} from "../contexts/GameContext";
import axios from "axios";

const GamesPage = (props) => {
    const [characters, setCharacters] = useState(null);
    const [search, setSearch] = useState("")

    useEffect(() => {
        getCharacters()
    }, [])

    const getCharacters = (search = "") => {
        const params = {}
        if(search.length>=1) params["search"] = search
        axios.get("https://localhost:5001/Character", {params})
            .then(res => {
                setCharacters(res.data)
            })
            .catch(e => {
                setCharacters(null)
            })
    }

    const runSearch = () => {
        getCharacters(search)
    }

    const searchBar = () => {
        return (
            <Row className="mt-2 mb-2">
                <Col md={{size: 8, offset:1}}>
                    <Input
                        type="search"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        id="exampleSearch"
                        placeholder="Search for characters..."
                    />
                </Col>
                <Col>
                    <Button onClick={()=>runSearch()} id="userUpdateBtn" color="primary">Search</Button>
                </Col>
            </Row>
        )
    }

    return (
        <Container fluid={true}>
            {searchBar()}
            <Row>
                <Col md={12}>
                    <CharacterList characters={characters} getCharacters={getCharacters} loggedIn={props.loggedIn}/>
                </Col>
            </Row>
        </Container>
    )
}

export default GamesPage