import React, {useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/header/Header';

import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import GamesPage from "./pages/GamesPage";
import GameInfoPage from "./pages/GameInfoPage";
import CharactersPage from "./pages/CharactersPage";
import CharacterInfoPage from "./pages/CharacterInfoPage";

import {GameProvider} from "./contexts/GameContext";

const Router = (props) => {
    const [loggedIn, setLoggedIn] = useState({loggedIn: true, role: "USER"})

    return (
        <BrowserRouter>
            <div>
                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                <Switch>
                    <Route exact path="/"
                           render={props => <HomePage loggedIn={loggedIn} {...props}/>}/>
                    <Route exact path="/games"
                           render={props => <GameProvider><GamesPage loggedIn={loggedIn} {...props}/></GameProvider>}/>
                    <Route exact path="/game/:id"
                           render={props => <GameProvider><GameInfoPage
                               loggedIn={loggedIn} {...props}/></GameProvider>}/>
                    <Route exact path="/characters"
                           render={props => <CharactersPage
                               loggedIn={loggedIn} {...props}/>}/>
                    <Route exact path="/character/:id"
                           render={props => <CharacterInfoPage
                               loggedIn={loggedIn} {...props}/>}/>
                    <Route render={props => <NotFoundPage/>}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Router