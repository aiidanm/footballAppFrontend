import React from "react";
import "../App.css";


const RecordGameList = ({players, selectedPlayers, handleDivClick, goalsScored, overTheFence}) => {
  
    return (
        <div className="Players">
            {players.map((player) => {
              const currentSelection = selectedPlayers[player.player_id] || {};
              return (
                <div
                  key={player.player_id}
                  className={`playerCard-${currentSelection.team || "unselected"}`}
                  onClick={() => handleDivClick(player)}
                >
                  <p>{player.player_name}</p>
    
                  <div className="counter-container">
                    <p>Goals Scored: {currentSelection.goals_scored || 0}</p>
                    <button
                      value={"-"}
                      onClick={(e) => {
                        e.stopPropagation();
                        goalsScored(e, player);
                      }}
                    >
                      -
                    </button>
                    <button
                      value={"+"}
                      onClick={(e) => {
                        e.stopPropagation();
                        goalsScored(e, player);
                      }}
                    >
                      +
                    </button>
                  </div>
    
                  <div className="counter-container">
                    <p>Over the fence: {currentSelection.kicked_over_fence || 0}</p>
                    <button
                      value={"-"}
                      onClick={(e) => {
                        e.stopPropagation();
                        overTheFence(e, player);
                      }}
                    >
                      -
                    </button>
                    <button
                      value={"+"}
                      onClick={(e) => {
                        e.stopPropagation();
                        overTheFence(e, player);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
    )
}

export default RecordGameList