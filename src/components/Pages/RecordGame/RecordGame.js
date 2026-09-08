import React, { useState, useEffect } from "react";
import { getPlayers, recordGame, updatePlayers, addPlayer} from "../../../ApiFuncs.js";
import RecordGameList from "./RecordGameComponent.jsx";
import SubmitPreview from "./submitPreview.jsx";
import { auth } from "../../Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header.jsx"

const RecordGame = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [dateSelected, setDateSelected] = useState();
  const [submitPage, setSubmitPage] = useState(false);
  const [waiting, setWaiting] = useState({ status: false, message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // const uid = user.uid;
      } else {
        navigate("/login");
      }
    });
    setWaiting({ status: true, message: "Waiting for server to load players" });
    getPlayers().then((res) => {
      console.log(res)
      setWaiting({ status: false, message: "" });
      setPlayers(
        res.sort((a, b) => a.player_name.localeCompare(b.player_name)),
      );
    });
  }, [navigate]);

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
          editedName: player.editedName
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

  const ownGoals = (e, player) => {
    setSelectedPlayers((prevSelected) => {
      const currentPlayerData = prevSelected[player.player_id] || {};
      const currentOwnGoals = currentPlayerData.own_goals || 0;

      if (e.target.value === "+") {
        return {
          ...prevSelected,
          [player.player_id]: {
            ...currentPlayerData,
            own_goals: currentOwnGoals + 1,
          },
        };
      } else if (e.target.value === "-") {
        return {
          ...prevSelected,
          [player.player_id]: {
            ...currentPlayerData,
            own_goals: currentOwnGoals - 1,
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!submitPage) {
//       setSubmitPage(true);
//       return;
//     }
//     setWaiting({
//       status: true,
//       message: "Submitting to database, please wait...",
//     });

//     let date = new Date(dateSelected);
//     const result = {
//       team1: [],
//       team2: [],
//     };
//     console.log(selectedPlayers)
//     Object.values(selectedPlayers).forEach((playerObj) => {
//       if (playerObj.team !== "unselected") {
//         result[playerObj.team].push({
//           name: playerObj.name,
//           player_id: playerObj.id,
//           goals_scored: playerObj.goals_scored || 0,
//           kicked_over_fence: playerObj.kicked_over_fence || 0,
//           own_goals: playerObj.own_goals || 0,
//         });
//       }
//     });

//     const team1Score = result.team1.reduce(
//       (acc, player) => acc + (player.goals_scored || 0),
//       0,
//     );

//     const team1ExtraGoals = result.team2.reduce(
//       (acc, player) => acc + (player.own_goals || 0),
//       0,
//     );

//     const team2Score = result.team2.reduce(
//       (acc, player) => acc + (player.goals_scored || 0),
//       0,
//     );

//     const team2ExtraGoals = result.team1.reduce(
//       (acc, player) => acc + (player.own_goals || 0),
//       0,
//     );

//     const team1FinalScore = team1Score + team1ExtraGoals;
//     const team2FinalScore = team2Score + team2ExtraGoals;

//     const newValue = {
//       date,
//       teams: result,
//       team1Score: team1FinalScore,
//       team2Score: team2FinalScore,
//     };
//     const playersToUpdate = players.filter((player) => player.editedName)
//     if(playersToUpdate.length > 0){
//       let payload = playersToUpdate.map((player) => {
//         console.log(player)
//         return {
//             "player_id": player.player_id,
//             "player_name": player.player_name
//         }
//       })
//       await updatePlayers(payload)
//     }


//     // collect players to submit to db≈
//     let customPlayers = players.filter(
//   (player) => player.player_id?.toString().includes("Custom") && player.player_name?.trim() !== ""
// );
//     if(customPlayers.length > 0){
//       let customPlayersPayload = customPlayers.map((customPlayer) => {
//         return {
//           "player_name": customPlayer.player_name
//         }
//       })
//       const createdPlayers = await addPlayer(customerPlayersPayload)
//       setPlayers((currPlayers) => {
//         const matchedPlayers = currPlayers.map((player) => {
//           if(String(player.player_id).includes("Custom")){
//             let matchedCreatedPlayer = createdPlayers.find((createdPlayer) => createdPlayer.player_name === player.player_name) 
//             return {
//               ...player,
//               player_id: matchedCreatedPlayer ? matchedCreatedPlayer.player_id : player.player_id
//             }
//           } else {
//             return player
//           }
//         })
//         return matchedPlayers
//       })
//     }
//     // await recordGame(newValue);

//     setSelectedPlayers({});
//     setSubmitPage(false);
//     setWaiting({
//       status: true,
//       message: "Game submitted successfully! Redirecting...",
//     });

//     setTimeout(() => {
//       navigate("/");
//     }, 3000);
//   };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!submitPage) {
    setSubmitPage(true);
    return;
  }
  setWaiting({
    status: true,
    message: "Submitting to database, please wait...",
  });

  const playersToUpdate = players.filter((player) => player.editedName && !String(player.player_id).includes("Custom"));
  if (playersToUpdate.length > 0) {
    const payload = playersToUpdate.map((player) => ({
      player_id: player.player_id,
      player_name: player.player_name,
    }));
    console.log("update players payload", payload)
    await updatePlayers(payload);
  }

  const customIdMap = {}; 
  const customPlayers = players.filter(
    (player) =>
      player.player_id?.toString().includes("Custom") &&
      player.player_name?.trim() !== ""
  );

  if (customPlayers.length > 0) {
    const customPlayersPayload = customPlayers.map((p) => ({
      name: p.player_name.trim(),
    }));
    console.log("created players payload", customPlayersPayload)
    // const createdPlayers = []
    const createdPlayers = await addPlayer(customPlayersPayload);

    customPlayers.forEach((customPlayer) => {
      const matched = createdPlayers.find(
        (cp) => cp.player_name === customPlayer.player_name
      );
      if (matched) {
        customIdMap[customPlayer.player_id] = matched.player_id;
      }
    });

    setPlayers((currPlayers) =>
      currPlayers.map((player) => ({
        ...player,
        player_id: customIdMap[player.player_id] || player.player_id,
      }))
    );
  }

  let date = new Date(dateSelected);
  const result = {
    team1: [],
    team2: [],
  };

  Object.values(selectedPlayers).forEach((playerObj) => {
    if (playerObj.team !== "unselected") {
      const resolvedId = customIdMap[playerObj.id] || playerObj.id;

      result[playerObj.team].push({
        name: playerObj.name,
        player_id: resolvedId,
        goals_scored: playerObj.goals_scored || 0,
        kicked_over_fence: playerObj.kicked_over_fence || 0,
        own_goals: playerObj.own_goals || 0,
      });
    }
  });

  const team1Score = result.team1.reduce(
    (acc, player) => acc + (player.goals_scored || 0),
    0
  );
  const team1ExtraGoals = result.team2.reduce(
    (acc, player) => acc + (player.own_goals || 0),
    0
  );
  const team2Score = result.team2.reduce(
    (acc, player) => acc + (player.goals_scored || 0),
    0
  );
  const team2ExtraGoals = result.team1.reduce(
    (acc, player) => acc + (player.own_goals || 0),
    0
  );

  const team1FinalScore = team1Score + team1ExtraGoals;
  const team2FinalScore = team2Score + team2ExtraGoals;

  const newValue = {
    date,
    teams: result,
    team1Score: team1FinalScore,
    team2Score: team2FinalScore,
  };
  console.log("record game payload", newValue)
  await recordGame(newValue);

  setSelectedPlayers({});
  setSubmitPage(false);
  setWaiting({
    status: true,
    message: "Game submitted successfully! Redirecting...",
  });

  setTimeout(() => {
    navigate("/");
  }, 3000);
};
  const handleDateChange = (e) => {
    setDateSelected(new Date(e.target.value));
  };

  const addNewPlayer = (e) => {
    e.preventDefault()
    setPlayers((currPlayers) => {
      const numCustomPlayers = currPlayers.filter((oPlayer) => oPlayer.player_id.toString().includes("Custom")).length + 1
      return [...currPlayers, {form: "", games_played: "0", own_goals: "0", player_id: "Custom" + numCustomPlayers, player_name: "", preferred_position: "", total_draws: "", total_goals_scored: "", total_kicked_over_fence: "", total_losses: "", total_wins: ""}]
    })
  }

  const handlePlayerNameChange = (playerId, newName) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.player_id === playerId
          ? { ...player, player_name: newName, editedName: true}
          : player
      )
    );
    setSelectedPlayers((prevSelected) => {
      if (prevSelected[playerId]) {
        return {
          ...prevSelected,
          [playerId]: {
            ...prevSelected[playerId],
            name: newName,
            editedName: true
          },
        };
      }
      return prevSelected;
    });
  };

  return (
    <div className="MainContainer">
      <Header />
      <h2>Record Game Page:</h2>

      {waiting.status ? (
        <h2>{waiting.message}</h2>
      ) : submitPage ? (
        <SubmitPreview
          players={players}
          selectedPlayers={selectedPlayers}
          handleDivClick={handleDivClick}
          goalsScored={goalsScored}
          overTheFence={overTheFence}
          handleSubmit={handleSubmit}
          setSubmitPage={setSubmitPage}
        />
      ) : (
        <div className="RecordContainer">
          <RecordGameList
            players={players}
            selectedPlayers={selectedPlayers}
            handleDivClick={handleDivClick}
            goalsScored={goalsScored}
            overTheFence={overTheFence}
            handleSubmit={handleSubmit}
            ownGoals={ownGoals}
            addNewPlayer={addNewPlayer}
            handlePlayerNameChange={handlePlayerNameChange}
          />
          <input
            type="date"
            onChange={handleDateChange}
            className="date-selector"
          ></input>
          <button onClick={handleSubmit} className="submit-game-button">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordGame;
