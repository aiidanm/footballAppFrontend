import React, { useState, useEffect } from "react";
import { getPlayers, recordGame } from "../../../ApiFuncs.js";
import RecordGameList from "./RecordGameComponent.jsx";
import SubmitPreview from "./submitPreview.jsx";
import { auth } from "../../Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

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

    let date = new Date(dateSelected);
    const result = {
      team1: [],
      team2: [],
    };

    Object.values(selectedPlayers).forEach((playerObj) => {
      if (playerObj.team !== "unselected") {
        result[playerObj.team].push({
          name: playerObj.name,
          player_id: playerObj.id,
          goals_scored: playerObj.goals_scored || 0,
          kicked_over_fence: playerObj.kicked_over_fence || 0,
          own_goals: playerObj.own_goals || 0,
        });
      }
    });

    const team1Score = result.team1.reduce(
      (acc, player) => acc + (player.goals_scored || 0),
      0,
    );

    const team1ExtraGoals = result.team2.reduce(
      (acc, player) => acc + (player.own_goals || 0),
      0,
    );

    const team2Score = result.team2.reduce(
      (acc, player) => acc + (player.goals_scored || 0),
      0,
    );

    const team2ExtraGoals = result.team1.reduce(
      (acc, player) => acc + (player.own_goals || 0),
      0,
    );

    const team1FinalScore = team1Score + team1ExtraGoals;
    const team2FinalScore = team2Score + team2ExtraGoals;

    const newValue = {
      date,
      teams: result,
      team1Score: team1FinalScore,
      team2Score: team2FinalScore,
    };

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

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
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
