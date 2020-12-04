import React, {useState, useContext} from 'react'
import GamesList from '../components/games/gameslist/GamesList'
import GameCreateForm from "../components/games/gameform/GameCreateForm";
import {Button, Col, Container, Input, Row} from 'reactstrap';
import {GameContext} from "../contexts/GameContext";

const GamesPage = (props) => {
    const [games, setGames, getGames] = useContext(GameContext);
    const [addNew, setAddNew] = useState(false);
    const [search, setSearch] = useState("")

    const runSearch = () => {
        getGames(search)
    }

    const searchBar = () => {
        return (
            <div>
                <Row className="mt-2 mb-2">
                    <Col md={{size: 8, offset:1}}>
                        <Input
                            type="search"
                            name="search"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            id="exampleSearch"
                            placeholder="Search for games..."
                        />
                    </Col>
                    <Col>
                        <Button onClick={()=>runSearch()} id="userUpdateBtn" color="primary">Search</Button>
                    </Col>
                </Row>
            </div>
        )
    }

    const adminTools = () => {
        return (
            <Row>
                <Col md={12}>
                    <Button onClick={() => setAddNew(!addNew)} id="userUpdateBtn"
                            color="primary">{addNew ? "X" : "Create new game"}</Button>
                </Col>
            </Row>
        )
    }

    return (
        <Container fluid={true}>
            {searchBar()}
            {props.loggedIn.loggedIn && props.loggedIn.role === "ADMIN" ? adminTools() : null}
            {addNew ? <GameCreateForm toggle={setAddNew}/> : null}
            <Row>
                <Col md={12}>
                    <GamesList games={games} getGames={getGames} loggedIn={props.loggedIn}/>
                </Col>
            </Row>
        </Container>
    )
}

export default GamesPage