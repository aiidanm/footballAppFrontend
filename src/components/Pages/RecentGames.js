import React, { useEffect, useState } from "react";
import "../../App.css";
import { getGames } from "../../ApiFuncs";
import { Link } from "react-router-dom";

const RecentGames = () => {
  const [games, setGames] = useState([]);
  const [waiting, setWaiting] = useState({ status: true, message: "Loading games, please wait." });

  useEffect(() => {
    const fetchData = async () => {
        setWaiting({ status: true, message: "Loading games, please wait." });
        const dbgames = await getGames();
        setGames(dbgames);
        setWaiting({ status: false, message: "" });
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    setWaiting({ status: true, message: "Refreshing games, please wait." });
    const dbgames = await getGames();
    setGames(dbgames);
    setWaiting({ status: false, message: "" });
  };

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">App</h1>
      </Link>
      <h2>Recent games</h2>
      <button onClick={handleUpdate}>Update list</button>
      {waiting.status ? ( 
        <h1>{waiting.message}</h1> 
      ) : (
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
      )}
    </div>
  );
};

export default RecentGames;