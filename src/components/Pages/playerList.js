import React, { useEffect, useState } from "react";
import "../../App.css";
import { getPlayers, updatePlayerById } from "../../ApiFuncs";
import EditPlayerForm from "./editPlayerForm";
import { Link } from 'react-router-dom';
import PlayerCard from "../playerCards/playerCard";

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
    {players.map((player, index) => (
        <PlayerCard
        key={player.id}
        player={player}
        index={index}
        expandedPlayer={expandedPlayer}
        handleEdit={handleEdit}
        onClick={() => handleExpand(player.id)}
        />
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
