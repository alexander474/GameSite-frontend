import React, {useContext, useState} from 'react';
import {GameContext} from "../../../contexts/GameContext";
import axios from 'axios'
import {Button, Card, CardBody, CardTitle, Input, InputGroup} from 'reactstrap';

const GameCreateForm = (prop) => {
    const [games, setGames, getGames] = useContext(GameContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")

    const addGame = () => {
        const _price = Number.parseFloat(price)
        axios.post('https://localhost:5001/Game', {
            name, description, category, price: _price
        }).then(res => {
            setName("")
            setDescription("")
            setCategory("")
            setPrice("")
            getGames()
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

                <InputGroup>
                    <Input type="text"
                           id="categoryInput"
                           onChange={(e) => setCategory(e.target.value)}
                           value={category}
                           placeholder="category"/>
                </InputGroup>

                <InputGroup>
                    <Input type="number"
                           tep="0.01"
                           min={0}
                           id="priceInput"
                           onChange={(e) => setPrice(e.target.value)}
                           value={price}
                           placeholder="price"/>
                </InputGroup>


                <Button onClick={addGame} id="userUpdateBtn" color="primary">Create</Button>
            </CardBody>
        </Card>
    )
}

export default GameCreateForm;