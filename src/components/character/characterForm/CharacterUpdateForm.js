import React, {useContext, useState} from 'react';
import {GameContext} from "../../../contexts/GameContext";
import axios from 'axios'
import {Button, Card, CardBody, CardTitle, Input, InputGroup} from 'reactstrap';

const CharacterUpdateForm = (prop) => {
    const [name, setName] = useState(prop.character.name)
    const [description, setDescription] = useState(prop.character.description)

    const updateCharacter = () => {
        axios.put('https://localhost:5001/Character/' + prop.character.characterId, {
            characterId: prop.character.characterId,
            name: name,
            description: description,
            images: prop.character.images,
            gameIds: prop.character.gameIds
        }).then(res => {
            prop.getCharacters()
            prop.toggle(false)
        }).catch(e => {
            console.log("could not update game")
        })
    }


    return (
        <Card className="mt-2 mb-2 ml-3 mr-3">
            <CardBody>
                <CardTitle>Update</CardTitle>
                <InputGroup>
                    <Input type="text"
                           id="nameInput"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                           placeholder="name"/>
                </InputGroup>

                <InputGroup>
                    <Input type="text"
                           id="descriptionInput"
                           onChange={(e) => setDescription(e.target.value)}
                           value={description}
                           placeholder="description"/>
                </InputGroup>

                <Button onClick={() => prop.toggle(false)} id="userUpdateBtn" color="primary">Back</Button>
                <Button onClick={updateCharacter} id="userUpdateBtn" color="primary">Update</Button>
            </CardBody>
        </Card>
    )
}

export default CharacterUpdateForm;