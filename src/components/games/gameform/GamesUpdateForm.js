import React, {useContext, useState} from 'react';
import {GameContext} from "../../../contexts/GameContext";
import axios from 'axios'
import {Button, Card, CardBody, CardTitle, Input, InputGroup} from 'reactstrap';

const GameUpdateForm = (prop) => {
    const [games, setGames, getGames] = useContext(GameContext)
    const [name, setName] = useState(prop.game.name)
    const [description, setDescription] = useState(prop.game.description)
    const [category, setCategory] = useState(prop.game.category)
    const [price, setPrice] = useState(prop.game.price)

    const updateGame = () => {
        const _price = Number.parseFloat(price)
        axios.put('https://localhost:5001/Game/' + prop.game.gameId, {
            gameId: prop.game.gameId,
            name: name,
            description: description,
            category: category,
            price: _price,
            images: prop.game.images,
            characterIds: prop.game.characterIds
        }).then(res => {
            getGames()
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

                <Button onClick={() => prop.toggle(false)} id="userUpdateBtn" color="primary">Back</Button>
                <Button onClick={updateGame} id="userUpdateBtn" color="primary">Update</Button>
            </CardBody>
        </Card>
    )
}

export default GameUpdateForm;