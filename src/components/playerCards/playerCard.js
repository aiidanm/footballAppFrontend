import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerGameInput from './PlayerGameInput';
import PlayerStats from './PlayerStats';
import "../../App.css"


const PlayerCard = ({player, page, handleChange, index}) => {


    return (
        <div key={player.id} className='playerCard'>
          <h3>{player.name}</h3>
          {page === "recordGame" && <PlayerGameInput player={player} handleChange={handleChange} index={index}/>}
          {page === "stats" && <PlayerStats player={player} handleChange={handleChange} index={index}/>}
          
        </div>
    )
}

export default PlayerCard