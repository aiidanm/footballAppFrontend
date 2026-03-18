import React, { useEffect, useState } from "react";
import "../../../App.css";
import { useParams } from "react-router-dom";
import { getPlayerById } from "../../../ApiFuncs";
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
      setWaiting({ status: false, message: "" });
      calcTotals(data);
    });
  }, []);

  const calcTotals = (p) => {
    let newP = p;
    newP.total_goals_scored = 0;
    newP.total_games_played = 0;
    newP.total_over_fence = 0;

    for (let i = 0; i < p.stats.length; i++) {
      const element = p.stats[i];
      newP.total_games_played++;
      newP.total_goals_scored += element.goals_scored;
      newP.total_over_fence = +element.kicked_over_fence;
    }
    setPlayer(newP);
  };

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
            <h2 className="playerName">{player.player_name} Stats</h2>
            <p>Total goals scored: {player.total_goals_scored}</p>
            <p>Total times kicked over the fence: {player.total_over_fence}</p>
            <p>Games played: {player.total_games_played}</p>
            <div className="players-recent-games">
              <h3>Recent games</h3>
              {player.stats
                .sort((a, b) => new Date(b.game_date) - new Date(a.game_date))
                .map((game) => {
                  return (
                    <Link
                      to={`/games/${game.game_id}`}
                      className={
                        game.is_winning_team === 1
                          ? "players-recent-game-card-win"
                          : "players-recent-game-card-loss"
                      }
                    >
                      <h3>
                        {new Intl.DateTimeFormat("en-GB").format(
                          new Date(game.game_date),
                        )}
                      </h3>
                      <h3>
                        Result:{" "}
                        {game.is_winning_team === 1 ? (
                          <p>Win</p>
                        ) : (
                          <p>Loss</p>
                        )}{" "}
                      </h3>
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
