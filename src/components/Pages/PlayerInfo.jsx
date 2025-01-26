import React, { useEffect, useState } from "react";
import "../../App.css";
import { useSearchParams, useParams } from "react-router-dom";
import { getPlayerById } from "../../ApiFuncs";
import { Link } from "react-router-dom";

const PlayerStats = () => {
  const { playerid } = useParams();
  const [player, setPlayer] = useState({});
  const [waiting, setWaiting] = useState({
    status: true,
    message: "Loading player stats, please wait.",
  });

  useEffect(() => {
    getPlayerById(playerid).then((data) => {
      console.log(data);
      setWaiting({ status: false, message: "" });
      setPlayer(data);
    });
  }, []);

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <div className="pageContainer">
        {waiting.status ? (
          <h1>{waiting.message}</h1>
        ) : (
          <div className="player_stats_container">
            <h2>{player.player_name} Stats</h2>
            <p>Total goals scored:</p>
            <p>Total times kicked over the fence:</p>
            <p>Games played:</p>
            <div className="players-recent-games">
              <h3>Recent games</h3>
              {player.stats.map((game) => {
                return (
                  <Link
                    to={`/games/${game.game_id}`}
                    className="players-recent-game-card"
                  >
                    <h3>{game.game_id}</h3>
                    <h3>Result: </h3>
                    <p>Goals Scored: {game.goals_scored}</p>
                    <p>over the fence: {game.kicked_over_fence}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerStats;
