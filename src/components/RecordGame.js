import React, { useState, useEffect } from "react";
import { getPlayers, recordGame } from "../ApiFuncs";
import  RecordGameList  from './RecordGameComponent.jsx';

const RecordGame = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [sendObject, setSendObject] = useState({});
  const [dateSelected, setDateSelected] = useState();
  const [waiting, setWaiting] = useState({status: false, message: ""})

  useEffect(() => {
    setWaiting({status: true, message: "Waiting for server to load players"})
    getPlayers().then((res) => {
    setWaiting({status: false, message: ""})
    setPlayers(res)});
  }, []);

  const handleDivClick = (player) => {
    setSelectedPlayers((prevSelected) => {
      const prevTeam = prevSelected[player.player_id]?.team || "unselected";
      const nextTeam = getNextTeam(prevTeam);

      return {
        ...prevSelected,
        [player.player_id]: {
          ...prevSelected[player.player_id],
          team: nextTeam,
          name: player.player_name,
          id: player.player_id,
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

  const goalsScored = (e, player) => {
    setSelectedPlayers((prevSelected) => {
      const currentPlayerData = prevSelected[player.player_id] || {};
      const currentGoals = currentPlayerData.goals_scored || 0;

      if (e.target.value === "+") {
        return {
          ...prevSelected,
          [player.player_id]: {
            ...currentPlayerData,
            goals_scored: currentGoals + 1,
          },
        };
      } else if (e.target.value === "-") {
        return {
          ...prevSelected,
          [player.player_id]: {
            ...currentPlayerData,
            goals_scored: currentGoals - 1,
          },
        };
      }
    });
  };

  const overTheFence = (e, player) => {
    setSelectedPlayers((prevSelected) => {
      const currentPlayerData = prevSelected[player.player_id] || {};
      const currentValue = currentPlayerData.kicked_over_fence || 0;

      if (e.target.value === "+") {
        return {
          ...prevSelected,
          [player.player_id]: {
            ...currentPlayerData,
            kicked_over_fence: currentValue + 1,
          },
        };
      } else if (e.target.value === "-") {
        return {
          ...prevSelected,
          [player.player_id]: {
            ...currentPlayerData,
            kicked_over_fence: currentValue - 1,
          },
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting({status: true, message: "submitting to database, please wait for confirmation"})
    let date = new Date(dateSelected)
   
    const result = {
      team1: [],
      team2: [],
      unselected: [],
    };

    Object.values(selectedPlayers).forEach((playerObj) => {
      result[playerObj.team].push({
        name: playerObj.name,
        player_id: playerObj.id,
        goals_scored: playerObj.goals_scored || 0,
        kicked_over_fence: playerObj.kicked_over_fence || 0,
      });
    });

    const team1Score = result.team1.reduce(
      (acc, player) => acc + (player.goals_scored || 0),
      0
    );

    const team2Score = result.team2.reduce(
      (acc, player) => acc + (player.goals_scored || 0),
      0
    );

    setSendObject((prevSendObject) => {
      const newValue = {
        ...prevSendObject,
        date: new Date(date),
        teams: result,
        team1Score: team1Score,
        team2Score: team2Score,
      };
      recordGame(newValue).then((res) => {
        setSelectedPlayers({})
        setWaiting({status: true, message: "Game submitted, you will be auto redirected to the home page shortly."})
        setTimeout(() => { 
          setWaiting({status: false, message: ""}) 
        }, 5000);
      });
      return newValue;
    });
  };

  const handleDateChange = (e) => {
    setDateSelected(new Date(e.target.value))
  };


  return (
    <div>
      <h1>Record Game</h1>
      {waiting.status ? <h2>{waiting.message}</h2> : <div className="RecordContainer">
      <RecordGameList players={players} selectedPlayers={selectedPlayers} handleDivClick={handleDivClick} goalsScored={goalsScored} overTheFence={overTheFence} />
      <input type="date" onChange={handleDateChange}></input>
       <button onClick={handleSubmit}>Submit</button>

      </div> }
      
      
    </div>
    
  )

 
};

export default RecordGame;
