import React, { useEffect, useState } from 'react';
import '../../App.css'
import { getGames } from '../../ApiFuncs';
import { Link } from 'react-router-dom';

const RecentGames = () => {
    const [games, setGames] =useState([])
    useEffect(() => {
        getGames().then((dbgames) => {
            console.log(dbgames)
            setGames(dbgames)
        })
    },[])

    return (
        <div className="MainContainer">
        <Link to="/" className="HomeLink">
          <h1 className="TitleHeader">App</h1>
        </Link>
        <h2>Recent games</h2>
        <div className="pageContainer">
            {games.map((game, index) => (
                <div className='recentGameCard' key={index}>
                    <p>Game Date: {new Intl.DateTimeFormat('en-GB').format(new Date(game.date))}</p>
                    <p>Game ID: {game.id}</p>
                </div>
            ))}
        </div>
      </div>
    );
};

export default RecentGames;