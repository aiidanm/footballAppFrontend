import React, { useEffect, useState } from "react";
import "../../App.css";
import { getGames } from "../../ApiFuncs";
import { Link } from "react-router-dom";

const RecentGames = () => {
  const [games, setGames] = useState([]);
  const [waiting, setWaiting] = useState({status: false, message: ""})

  useEffect(() => {
    setWaiting({status: true, message: "Loading games, please wait."})
    getGames().then((dbgames) => {
      setWaiting({status: false, message: ""})
      setGames(dbgames);
    });
  }, []);

  const handleUpdate = () => {
    setWaiting({status: true, message: "refreshing games, please wait."})
    getGames().then((dbgames) => {
      setWaiting({status: false, message: ""})
      setGames(dbgames);
    });
  };

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">App</h1>
      </Link>
      <h2>Recent games</h2>
      <button onClick={handleUpdate()}>Update list</button>
      <div className="pageContainer">
        {games.map((game, index) => (
          <div className="recentGameCard" key={index}>
            <p>
              Game Date:{" "}
              {new Intl.DateTimeFormat("en-GB").format(
                new Date(game.game_date)
              )}
            </p>
            <p>Game ID: {game.game_id}</p>
            <p>Team 1 Score: {game.team1_score} </p>
            <p>Team 2 Score: {game.team2_score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentGames;
