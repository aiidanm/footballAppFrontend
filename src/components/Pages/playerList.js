import React, { useEffect, useState } from "react";
import "../../App.css";
import { getPlayers, updatePlayerById } from "../../ApiFuncs";
import { Link } from 'react-router-dom';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState("total_goals_scored"); // Initial sort field
  const [sortOrder, setSortOrder] = useState("desc"); // Initial sort order (descending)

  useEffect(() => {
    getPlayers().then((data) => {
      console.log(data)
      setPlayers(data);
    });
  }, []);

  const sortPlayers = (playerData, field, order) => {
    const sortedPlayers = [...playerData]; // Create a copy to avoid mutating the original state directly
    
    sortedPlayers.sort((a, b) => {
      let aValue;
      let bValue;

      if (field === "total_goals_scored") {
        aValue = a.total_goals_scored;
        bValue = b.total_goals_scored;
       } else if (field === "total_kicked_over_fence") {
        aValue = a.over_fence_per_game;
        bValue = b.over_fence_per_game;
      }

      if (order === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return sortedPlayers;
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPlayers(sortPlayers(players, event.target.value, sortOrder))
  };

  const handleOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setPlayers(sortPlayers(players, sortBy, sortOrder === "asc" ? "desc" : "asc"))
  };

  return (
    <div className="MainContainer">
      <Link to="/" className='HomeLink'>
        <h1 className='TitleHeader'>App</h1>
      </Link>
      <h2>Players</h2>
      <div className="sortContainer">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="total_goals_scored">Goals Scored</option>
          <option value="total_kicked_over_fence">Over the fence</option>
        </select>
        <button onClick={handleOrderChange}>
          Toggle Order ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
        </div>
      <div className="Players">
        
        {players.map((player) => (
          <div className="playerCard-unselected" key={player.player_id}>
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