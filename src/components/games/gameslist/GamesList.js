import React, {useContext, useState} from 'react';
import GamesItem from './GamesItem'
import {Button, CardColumns, Col, Input, Row} from 'reactstrap';
import CharacterItem from "../../character/CharacterItem";

const GamesList = (props) => {

    return (
        <div>
            <Row className="mt-2 mb-2">
                <Col md={12}>
                    <CardColumns>
                        {props.games && Array.isArray(props.games) ? props.games.map((g, i) => <GamesItem key={i + "bd"}  getGames={props.getGames} loggedIn={props.loggedIn} game={g}/>) :
                            <p>No Games</p>}
                    </CardColumns>
                </Col>
            </Row>
        </div>
    )
}

export default GamesList;