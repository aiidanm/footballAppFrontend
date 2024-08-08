import React, { useEffect, useState } from "react";
import "../../App.css";
import { getPlayers, updatePlayerById } from "../../ApiFuncs";
import EditPlayerForm from "./editPlayerForm";
import { Link } from 'react-router-dom';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [editPlayer, setEditPlayer] = useState(null);

  useEffect(() => {
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  const handleExpand = (playerId) => {
    setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
  };

  const handleEdit = (player) => {
    setEditPlayer(player);
  };

  const handleSave = () => {
    updatePlayerById(editPlayer.id, editPlayer).then(() => {
      setEditPlayer(null);
      setExpandedPlayer(null);
      getPlayers().then((data) => {
        setPlayers(data);
      });
    });
  };



  return (
    <div className="MainContainer">
       <Link to="/" className='HomeLink'>
    <h1 className='TitleHeader'>App</h1>
    </Link>
    <h2>Recent Games</h2>
    <div className="Players">
    {players.map((player) => (
        <div key={player.id} className={`player-card ${expandedPlayer === player.id ? 'expanded' : ''}`} onClick={() => handleExpand(player.id)}>
          <h3>{player.name}</h3>
          <div className="player-stats">
            <p>Games: {player.games_played}</p>
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
        </div>
      ))}
      {editPlayer && (
        <EditPlayerForm    title="Edit Player"
        player={editPlayer}
        setPlayer={setEditPlayer}
        handleSave={handleSave} />
      )}
    </div>
    </div>
  );
};

export default PlayerList;
