import React, { useEffect, useState } from 'react';
import '../../App.css'
import { getGames } from '../../ApiFuncs';

const RecentGames = () => {
    const [games, setGames] =useState([])
    useEffect(() => {
        getGames().then((dbgames) => {
            console.log(dbgames)
            setGames(dbgames)
        })
    },[])

    return (
        <div className='RecentGames'>
            {games.map((game, index) => {
                <div>
                </div>
            })}
        </div>
    );
};

export default RecentGames;