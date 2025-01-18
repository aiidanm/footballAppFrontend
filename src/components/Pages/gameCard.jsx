import React, { useEffect, useState } from "react";
import "../../App.css";

const GameInfo = ({ games, setGames }) => {
  const handleDivClick = (gameId) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.game_id === gameId
          ? { ...game, expanded: !game.expanded }
          : game
      )
    );
  };

  return (
    <div className="pageContainer">
      {games.map((game) => (
        <div
          className="recentGameCard"
          key={game.game_id}
          onClick={() => handleDivClick(game.game_id)}
        >
          <p>
            Game Date:{" "}
            {new Intl.DateTimeFormat("en-GB").format(new Date(game.game_date))}
          </p>
          <p>Game ID: {game.game_id}</p>
          <p>Red team score: {game.team1_score} </p>
          <p>Blue team score: {game.team2_score}</p>

          {game.expanded && (
            <div className="expandedContent">
              <div className="teamsContainer">
                <h3>Player list</h3>
                <div className="teamContainer">
                    <h3>Red Team</h3>
                </div>
                <div className="teamContainer">
                    <h3>Blue Team</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameInfo;