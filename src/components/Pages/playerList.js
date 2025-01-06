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

 

 

 const sortPlayers = (field, order) => {
    if (field === "Goals Scored") {
  } else if (field === "Assists") {
  } else if (field === "Clean Sheets") {
  } else if (field === "Yellow Cards") {
  } else if (field === "Red Cards") {
  } else {
  }
 }



  return (
    <div className="MainContainer">
       <Link to="/" className='HomeLink'>
    <h1 className='TitleHeader'>App</h1>
    </Link>
    <h2>Players</h2>
    <div className="Players">
      <select>
        <option value="Goals Scored">Goals Scored</option>
        <option value="Games Played">Games Played</option>
        <option value="Over the fence">Over the fence</option>
        <option value="Wins">Wins</option>
        <option value="Win rate">Win rate</option>
        <option value="Goals per game">Goals per game</option>
        <option value="Over the fence per game">over the fence per game</option>
      </select>
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
