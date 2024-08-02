import React, { useEffect, useState } from "react";
import "../../App.css";
import { getPlayers } from "../../ApiFuncs";
const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  return (
    <div className="RecentGames">
      {players.map((player, index) => (
        <div key={index} className="player-card">
          <h3>{player.name}</h3>
          <p>{player.position}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
