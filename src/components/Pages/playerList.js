import React, { useEffect, useState } from "react";
import "../../App.css";
import { getPlayers } from "../../ApiFuncs";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState("total_goals_scored"); // Initial sort field
  const [sortOrder, setSortOrder] = useState("desc"); // Initial sort order (descending)
  const [waiting, setWaiting] = useState({
    status: false,
    message: "loading players please wait",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setWaiting({ status: true, message: "loading players please wait" });
    getPlayers().then((data) => {
      setWaiting({ status: false, message: "loading players please wait" });
      setPlayers(data);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
      } else {
        navigate("/login");
      }
    });
  },[navigate]);

  const sortPlayers = (playerData, field, order) => {
    const sortedPlayers = [...playerData];

    sortedPlayers.sort((a, b) => {
      let aValue;
      let bValue;

      if (field === "total_goals_scored") {
        aValue = a.total_goals_scored;
        bValue = b.total_goals_scored;
      } else if (field === "total_kicked_over_fence") {
        aValue = a.over_fence_per_game;
        bValue = b.over_fence_per_game;
      }

      if (order === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return sortedPlayers;
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPlayers(sortPlayers(players, event.target.value, sortOrder));
  };

  const handleOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setPlayers(
      sortPlayers(players, sortBy, sortOrder === "asc" ? "desc" : "asc")
    );
  };

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <h2>Players</h2>
      {waiting.status ? (
        <h2>{waiting.message}</h2>
      ) : (
        <>
          <div className="sortContainer">
            <label htmlFor="playerSortSelect" className="sortByLabel">
              Sort by:
            </label>
            <div class="playerSortSelect-wrapper">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="playerSortSelect"
              >
                <option value="total_goals_scored">Goals Scored</option>
                <option value="total_kicked_over_fence">Over the fence</option>
              </select>
            </div>
            <button onClick={handleOrderChange} className="sortButton">
              Toggle Order ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
          </div>
          <div className="Players">
            {players.map((player) => (
              <Link
                to={`/players/${player.player_id}`}
                className="playerCard-list"
              >
                <h2 className="playerName">{player.player_name}</h2>
                <div className="playerCard-Section2">
                  <div className="playerCard-left">
                    <h3>Stats</h3>
                    <p>Total Goals: {player.total_goals_scored}</p>
                    <p>
                      Times kicked over Fence: {player.total_kicked_over_fence}
                    </p>
                    <p>Games Played: {player.games_played}</p>
                    <p>Wins: {player.total_wins}</p>
                  </div>
                  <div className="playerCard-right">
                    <h3>Per Game Stats</h3>
                    <p>
                      GPG:{" "}
                      {(
                        player.total_goals_scored / player.games_played
                      ).toFixed(2)}
                    </p>
                    <p>
                      FPG:{" "}
                      {(
                        player.total_kicked_over_fence / player.games_played
                      ).toFixed(2)}
                    </p>
                    <p>
                      Win ratio:{" "}
                      {(player.total_wins / player.games_played).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerList;
