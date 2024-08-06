import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../App.css"

const PlayerStats = ({player, handleChange, index}) => {

    return (
        <div className='PlayerStats'>
            <p className='GamesPlayed'>Games Played: {player.games_played}</p>
            <p className='Scored'>Scored: {player.goals}</p>
            <p className='Assists'>Assists: {player.assists}</p>
            <p className='WinLoss'>Win / Loss: {player.wins} : {player.games_played - player.wins}</p>
            <p className='OverTheFence'>Over the fence: {player.over_fence}</p>
        </div>
    )
}

export default PlayerStats