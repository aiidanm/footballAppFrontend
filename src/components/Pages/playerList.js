import React, { useEffect, useState } from "react";
import "../../App.css";
import { getPlayers, updatePlayerById } from "../../ApiFuncs";
import { Link } from 'react-router-dom';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [editPlayer, setEditPlayer] = useState(null);

  useEffect(() => {
    getPlayers().then((data) => {
      console.log(data)
      setPlayers(data);
    });
  }, []);

 

 

 



  return (
    <div className="MainContainer">
       <Link to="/" className='HomeLink'>
    <h1 className='TitleHeader'>App</h1>
    </Link>
    <h2>Players</h2>
    <div className="Players">
    {players.map((player, index) => (
      <div className="playerCard">
       <p>{player.player_name}</p>
       <p>Preferred Position: {player.preferred_position}</p>
       <p>Total Goals: {player.total_goals_scored}</p>
       <p>Times kicked over Fence: {player.total_kicked_over_fence}</p>
       </div>
      ))}
    </div>
    </div>
  );
};

export default PlayerList;
