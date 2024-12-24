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

  const handleDivClick = (player) => {
    setSelectedPlayers((prevSelected) => {
      const prevTeam = prevSelected[player.player_id]?.team || "unselected";
      const nextTeam = getNextTeam(prevTeam);

      return {
        ...prevSelected,
        [player.player_id]: {
          team: nextTeam,
          name: player.player_name,
          id: player.player_id
        },
      };
    });
  };

  const getNextTeam = (currentTeam) => {
    switch (currentTeam) {
      case "unselected":
        return "team1";
      case "team1":
        return "team2";
      case "team2":
        return "unselected";
      default:
        return "unselected";
    }
  };

  const handleChange = (playerId, field, value) => {
    setSelectedPlayers((prevSelected) => ({
      ...prevSelected,
      [playerId]: {
        ...prevSelected[playerId],
        [field]: value,
        Player_id: playerId,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = {
      team1: [],
      team2: [],
      unselected: [],
    };

    Object.values(selectedPlayers).forEach((playerObj) => {
      result[playerObj.team].push([playerObj.name, playerObj.id]);
    });

    console.log(result)
    // recordGame({ date: new Date(), players: playersToSubmit });
    // setSelectedPlayers({}); // Clear selections after submission
  };

  return (
    <div className="MainContainer">
      <div className="Players">
        {players.map((player) => (
          <div
            key={player.player_id}
            className={`playerCard ${
              selectedPlayers[player.player_id] || "unselected"
            }`} // Add class based on selection
            onClick={() => handleDivClick(player)}
          >
            <p>{player.player_name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RecordGame;
