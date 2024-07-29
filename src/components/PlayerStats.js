import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerStats = ({player, handleChange, index}) => {

    return (
        <div className='PlayerStats'>
            <p>Games Played: {player.games_played}</p>
            <p>Scored: {player.goals}</p>
            <p>Assists: {player.assists}</p>
            <p>Win / Loss: {player.wins} : {player.games_played - player.wins}</p>
            <p>Over the fence: {player.over_fence}</p>
          </div>
    )
}

export default PlayerStats