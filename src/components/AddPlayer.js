import React, { useState } from "react";
import "../App.css";
import { addPlayer } from "../ApiFuncs";

const NewPlayer = () => {
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    preferred_position: "",
  });

  const handleSave = () => {
    addPlayer(newPlayer).then(() => {
      setNewPlayer({
        name: "",
        preferred_position: "",
      });
      
    });
  };

  return (
   <div className="new-player-form">
    <p>add new player</p>
   </div>
  );
};

export default NewPlayer;
