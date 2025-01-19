import React, { useEffect, useState } from "react";
import "../../App.css";
import { useSearchParams, useParams } from "react-router-dom";
import { getGameById } from "../../ApiFuncs";
import { Link } from "react-router-dom";

const GameStats = () => {
  const { gameid } = useParams();
  const [game, setGame] = useState({});
  const [waiting, setWaiting] = useState({
    status: true,
    message: "Loading game stats, please wait.",
  });

  useEffect(() => {
    getGameById(gameid).then((data) => {
      console.log(data);
      setGame(data);
      setWaiting({ status: false, message: "" });
    });
  }, []);

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <div className="Game_Stats_Page">
        {waiting.status ? (
          <h1>{waiting.message}</h1>
        ) : (
          <div>
            <p>
              Game Date:{" "}
              {new Intl.DateTimeFormat("en-GB").format(
                new Date(game.game_date)
              )}
            </p>
            <p>Game ID: {game.game_id}</p>
            <div className="teams_container">
              <div className="team_container-red">
                <h2>Red Team</h2>
                <h3>{game.team1_score}</h3>
                <div className="players_container">
                  <table>
                    <tr>
                      <th>Name</th>
                      <th>Goals Scored</th>
                      <th>Over the fence</th>
                    </tr>
                    {game.teams[0].players.map((player) => {
                      return (
                        <tr>
                          <td>{player.player_name}</td>
                          <td>{player.goals_scored}</td>
                          <td>{player.kicked_over_fence}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
              <div className="team_container-blue">
                <h2>Blue Team</h2>
                <h3>{game.team2_score}</h3>
                <div className="players_container">
                  <table>
                    <tr>
                      <th>Name</th>
                      <th>Goals Scored</th>
                      <th>Over the fence</th>
                    </tr>
                    {game.teams[1].players.map((player) => {
                      return (
                        <tr>
                          <td>{player.player_name}</td>
                          <td>{player.goals_scored}</td>
                          <td>{player.kicked_over_fence}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStats;
