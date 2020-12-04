import React, {useContext, useState} from 'react';
import {Button, CustomInput, FormGroup, Label} from 'reactstrap';
import axios from "axios";
import {GameContext} from "../../../contexts/GameContext";

const GameImageUpload = (prop) => {
    const [games, setGames, getGames] = useContext(GameContext)
    const [imageFile, setImageFile] = useState(null);

    const uploadImage = () => {
        if (imageFile !== null) {
            const data = new FormData();
            data.append("file", imageFile)
            data.append("gameId", prop.gameId)
            axios.post('https://localhost:5001/Game/UploadImage', data, {headers: {"Content-Type": "multipart/form-data"}}).then(res => {
                getGames()
                prop.toggle(false)
            }).catch(e => {
                console.log("could not add image")
            })
        }
    }

    return (
        <FormGroup>
            <Label for="exampleCustomFileBrowser">Add image</Label>
            <CustomInput onChange={(e) => setImageFile(e.target.files[0])} type="file" id="exampleCustomFileBrowser"
                         name="customFile" label="Select an image"/>
            <Button onClick={uploadImage} id="userUpdateBtn" color="primary">Create</Button>
        </FormGroup>
    )
}

export default GameImageUpload;