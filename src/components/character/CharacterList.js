import React, {useEffect, useState} from 'react';
import CharacterItem from "./CharacterItem";
import {CardColumns} from 'reactstrap';
import axios from "axios";

const CharacterList = (props) => {

    return (
        <CardColumns>
            {props.characters ? props.characters.map((c, i) => <CharacterItem key={i + "basdas"} getCharacters={props.getCharacters}
                                                                  loggedIn={props.loggedIn} character={c}/>) : <p>No Characters</p>}
        </CardColumns>
    )
}

export default CharacterList;