import React, { useState, useEffect } from "react";
import axios from "axios";

const RecordGame = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const result = await axios.get("http://localhost:5000/players");
      setPlayers(result.data);
    };
    fetchPlayers();
  }, []);

  const handleChange = (index, field, value) => {
    const updatedPlayers = [...selectedPlayers];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value,
    };
    setSelectedPlayers(updatedPlayers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/games", {
      date: new Date(),
      players: selectedPlayers,
    });
    setSelectedPlayers([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {players.map((player, index) => (
        <div key={player.id}>
          <h3>{player.name}</h3>
          <label>
            Played:
            <input
              type="checkbox"
              onChange={(e) => handleChange(index, "played", e.target.checked)}
            />
          </label>
          <label>
            Scored:
            <input
              type="number"
              onChange={(e) => handleChange(index, "scored", e.target.checked)}
            />
          </label>
          <label>
            Assisted:
            <input
              type="number"
              onChange={(e) =>
                handleChange(index, "assisted", e.target.checked)
              }
            />
          </label>
        </div>
      ))}
      <button type="submit">Record Game</button>
    </form>
  );
};

export default RecordGame;
