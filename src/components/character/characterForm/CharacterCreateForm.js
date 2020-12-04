import React, {useContext, useState} from 'react';
import axios from 'axios'
import {Button, Card, CardBody, CardTitle, Input, InputGroup} from 'reactstrap';

const CharacterCreateForm = (prop) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const addCharacter = () => {
        axios.post('https://localhost:5001/Character', {
            name, description, gameIds: [prop.gameId]
        }).then(res => {
            setName("")
            setDescription("")
            prop.toggle(false)
        }).catch(e => {
            console.log("could not add game")
        })
    }


    return (
        <Card className="mt-2 mb-2 ml-3 mr-3">
            <CardBody>
                <CardTitle>Create a new game</CardTitle>
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


                <Button onClick={addCharacter} id="userUpdateBtn" color="primary">Create</Button>
            </CardBody>
        </Card>
    )
}

export default CharacterCreateForm;