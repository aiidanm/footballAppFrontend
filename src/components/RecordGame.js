import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./playerCards/playerCard";
import { Link } from "react-router-dom";
import { getPlayers, recordGame } from "../ApiFuncs";

const RecordGame = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    getPlayers().then((res) => setPlayers(res));
  }, []);

  const handleChange = (index, field, value, player) => {
    console.log(index, field, value, player.id);
    const updatedPlayers = [...selectedPlayers];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value,
      Player_id: player.id,
    };
    setSelectedPlayers(updatedPlayers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ date: new Date(), players: selectedPlayers })
    recordGame({ date: new Date(), players: selectedPlayers });
    setSelectedPlayers([]);
  };

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">App</h1>
      </Link>
      <h2>Record Game</h2>
      <div className="pageContainer">
        <div className="Players">
          {players.map((player, index) => (
            <PlayerCard
              key={player.id}
              player={player}
              index={index}
              selectedPlayers={selectedPlayers}
              handleChange={handleChange}
              page={"recordGame"}
            
            />
          ))}
          <button className="recordGameButton" onClick={handleSubmit}>
            Record Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordGame;
