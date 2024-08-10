import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerGameInput from './PlayerGameInput';
import PlayerStats from './PlayerStats';
import "../../App.css"


const PlayerCard = ({player, page, handleChange, index, expandedPlayer, handleEdit, onClick}) => {


    return (
        <div key={player.id} className={`player-card ${expandedPlayer === player.id ? 'expanded' : ''}`} onClick={onClick}>
          <h3>{player.name}</h3>
          {page === "recordGame" && <PlayerGameInput player={player} handleChange={handleChange} index={index}/>}
          {expandedPlayer === player.id && (
              <>
                <p>Goals: {player.goals}</p>
                <p>Assists: {player.assists}</p>
                <p>Wins: {player.wins}</p>
                <p>Losses: {player.games_played - player.wins}</p>
                <button onClick={(e) => { e.stopPropagation(); handleEdit(player); }}>Edit</button>
              </>
            )}
          
        </div>
    )
}

export default PlayerCard