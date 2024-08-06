import React from 'react';
import React, { useState } from 'react';
import '../../App.css'


const RecentGames = () => {
    const [players, setPlayers] = useState([]);

    return (
        <div className='RecentGames'>
            {players.map((player, index) => (
                <div key={index} className='player-card'>
                    <h3>{player.name}</h3>
                    <p>{player.position}</p>
                </div>
            ))}
        </div>
    );
};

export default RecentGames;