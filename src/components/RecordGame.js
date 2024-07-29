import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerCard from './playerCard';

const RecordGame = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [testData, setTestData] = useState([{id: 1, name: "Aidan", preferred_position: "defender", goals: 5, assists: 1, games_played: 5, over_fence: 5, wins: 3}])

  useEffect(() => {
    // const fetchPlayers = async () => {
    //   const result = await axios.get('http://localhost:5000/players');
    //   setPlayers(result.data);
    // };
    // fetchPlayers();
    setPlayers(testData)
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
    await axios.post('http://localhost:5000/games', { date: new Date(), players: selectedPlayers });
    setSelectedPlayers([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {players.map((player, index) => (
        <PlayerCard index={index} player={player} handleChange={handleChange} page={"recordGame"}/>
      ))}
      <button type="submit">Record Game</button>
    </form>
  );
};

export default RecordGame;
