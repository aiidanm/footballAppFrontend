import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerCard from './playerCards/playerCard';
import { Link } from 'react-router-dom';
import { getPlayers } from '../ApiFuncs';

const RecordGame = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [testData, setTestData] = useState([
    { id: 1, name: "Aidan", preferred_position: "defender", goals: 5, assists: 1, games_played: 5, over_fence: 2, wins: 3 },
    { id: 2, name: "Bella", preferred_position: "midfielder", goals: 3, assists: 4, games_played: 6, over_fence: 0, wins: 4 },
    { id: 3, name: "Charlie", preferred_position: "forward", goals: 8, assists: 2, games_played: 5, over_fence: 1, wins: 5 },
    { id: 4, name: "Diana", preferred_position: "goalkeeper", goals: 0, assists: 0, games_played: 7, over_fence: 0, wins: 5 },
    { id: 5, name: "Evan", preferred_position: "defender", goals: 2, assists: 3, games_played: 6, over_fence: 1, wins: 4 },
    { id: 6, name: "Fiona", preferred_position: "midfielder", goals: 4, assists: 5, games_played: 7, over_fence: 3, wins: 6 },
    { id: 7, name: "George", preferred_position: "forward", goals: 7, assists: 1, games_played: 6, over_fence: 0, wins: 5 },
    { id: 8, name: "Hannah", preferred_position: "defender", goals: 1, assists: 2, games_played: 5, over_fence: 2, wins: 2 },
    { id: 9, name: "Ian", preferred_position: "midfielder", goals: 6, assists: 6, games_played: 6, over_fence: 1, wins: 4 },
    { id: 10, name: "Jenna", preferred_position: "goalkeeper", goals: 0, assists: 0, games_played: 7, over_fence: 0, wins: 6 },
    { id: 11, name: "Kyle", preferred_position: "forward", goals: 9, assists: 3, games_played: 8, over_fence: 2, wins: 7 },
    { id: 12, name: "Liam", preferred_position: "defender", goals: 2, assists: 4, games_played: 7, over_fence: 1, wins: 5 },
    { id: 13, name: "Mia", preferred_position: "midfielder", goals: 5, assists: 7, games_played: 8, over_fence: 0, wins: 6 },
    { id: 14, name: "Noah", preferred_position: "forward", goals: 10, assists: 2, games_played: 7, over_fence: 3, wins: 7 },
    { id: 15, name: "Olivia", preferred_position: "defender", goals: 3, assists: 3, games_played: 6, over_fence: 1, wins: 4 }
  ] )

  useEffect(() => {
    getPlayers().then((data) => {
      setPlayers(data);
    });
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
    <div className='MainContainer'>
                <Link to="/" className='HomeLink'>
    <h1 className='TitleHeader'>App</h1>
    </Link>
                <h2>Record Game</h2>
                <div className='pageContainer'>
                    <div className='recordGameCardContainer'>
                        {players.map((player, index) => (
                            <PlayerCard key={player.id} player={player} index={index} selectedPlayers={selectedPlayers} handleChange={handleChange} page={"recordGame"} />
                        ))}
                    </div>
                </div>
            </div>
  );
};

export default RecordGame;
