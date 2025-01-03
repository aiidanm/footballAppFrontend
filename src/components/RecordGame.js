import React, { useState, useEffect } from "react";
import { getPlayers, recordGame } from "../ApiFuncs";

const RecordGame = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [sendObject, setSendObject] = useState({});
  const [dateSelected, setDateSelected] = useState();
  const [waiting, setWaiting] = useState(false);

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
    setWaiting(true);
    let date = new Date(e.target.parentElement.children[2].valueAsDate);

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
      console.log("Updated sendObject:", newValue);
      recordGame(newValue).then((res) => {
        console.log(res);
        setWaiting(false);
      });
      return newValue;
    });
  };

  const handleDateChange = (e) => {
    setDateSelected(new Date(e.target.value));
  };

  return (
    <div className="MainContainer">
      <h1>Record Game</h1>
      {waiting ? (
        <h2>recording game, please wait</h2>
      ) : (
        <>
          {" "}
          <div className="Players">
            {players.map((player) => {
              const currentSelection = selectedPlayers[player.player_id] || {};
              return (
                <div
                  key={player.player_id}
                  className={`playerCard-${
                    currentSelection.team || "unselected"
                  }`}
                  onClick={() => handleDivClick(player)}
                >
                  <p>{player.player_name}</p>

                  <div className="counter-container">
                    <p>Goals Scored: {currentSelection.goals_scored || 0}</p>
                    <button
                      value={"-"}
                      onClick={(e) => {
                        e.stopPropagation();
                        goalsScored(e, player);
                      }}
                    >
                      -
                    </button>
                    <button
                      value={"+"}
                      onClick={(e) => {
                        e.stopPropagation();
                        goalsScored(e, player);
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div className="counter-container">
                    <p>
                      Over the fence: {currentSelection.kicked_over_fence || 0}
                    </p>
                    <button
                      value={"-"}
                      onClick={(e) => {
                        e.stopPropagation();
                        overTheFence(e, player);
                      }}
                    >
                      -
                    </button>
                    <button
                      value={"+"}
                      onClick={(e) => {
                        e.stopPropagation();
                        overTheFence(e, player);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <input type="date" onChange={handleDateChange}></input>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default RecordGame;
