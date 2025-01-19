import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
const GameInfo = ({ games, setGames }) => {
  // const handleDivClick = (gameId) => {
  //   setGames((prevGames) =>
  //     prevGames.map((game) =>
  //       game.game_id === gameId
  //         ? { ...game, expanded: !game.expanded }
  //         : game
  //     )
  //   );
  // };

  return (
    <div className="pageContainer">
      {games.map((game) => (
        <Link to={`/games/${game.game_id}`} className="recentGameCard">
          <p>
            Game Date:{" "}
            {new Intl.DateTimeFormat("en-GB").format(new Date(game.game_date))}
          </p>
          <p>Game ID: {game.game_id}</p>
          <p>Red team score: {game.team1_score} </p>
          <p>Blue team score: {game.team2_score}</p>
        </Link>
      ))}
    </div>
  );
};

export default GameInfo;
