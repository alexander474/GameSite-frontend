import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios'

export const GameContext = createContext();

export const GameProvider = (props) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames()
    }, [])

    const getGames = (search = "") => {
        const params = {}
        if(search.length>=1) params["search"] = search
        axios.get("https://localhost:5001/Game", {params})
            .then(res => {
                setGames(res.data)
            })
            .catch(e => {
                setGames([])
            })
    }

    return (
        <GameContext.Provider value={[games, setGames, getGames]}>
            {props.children}
        </GameContext.Provider>
    )

}