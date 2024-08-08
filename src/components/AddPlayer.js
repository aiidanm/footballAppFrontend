import React, { useState } from "react";
import "../App.css";
import { addPlayer } from "../ApiFuncs";
import EditPlayerForm from "../components/Pages/editPlayerForm";

const NewPlayer = () => {
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    preferred_position: "",
    goals: 0,
    assists: 0,
    games_played: 0,
    over_fence: 0,
    wins: 0,
  });

  const handleSave = () => {
    addPlayer(newPlayer).then(() => {
      setNewPlayer({
        name: "",
        preferred_position: "",
        goals: 0,
        assists: 0,
        games_played: 0,
        over_fence: 0,
        wins: 0,
      });
      
    });
  };

  return (
    <EditPlayerForm
      title="Add New Player"
      player={newPlayer}
      setPlayer={setNewPlayer}
      handleSave={handleSave}
    />
  );
};

export default NewPlayer;
