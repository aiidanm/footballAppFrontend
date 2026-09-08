import React, { useState } from "react";
import "../../../App.css";

const RecordGameList = ({
  players,
  selectedPlayers,
  handleDivClick,
  goalsScored,
  overTheFence,
  ownGoals,
  addNewPlayer,
  handlePlayerNameChange,
}) => {
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleStartEdit = (e, player) => {
    e.stopPropagation();
    setEditingPlayerId(player.player_id);
    setEditingName(player.player_name || "");
  };

  const handleSaveEdit = (e, playerId) => {
    if (e) e.stopPropagation();
    if (handlePlayerNameChange) {
      handlePlayerNameChange(playerId, editingName.trim());
    }
    setEditingPlayerId(null);
    setEditingName("");
  };

  const handleCancelEdit = (e) => {
    if (e) e.stopPropagation();
    setEditingPlayerId(null);
    setEditingName("");
  };

  return (
    <div className="Players">
      {players.map((player) => {
        const currentSelection = selectedPlayers[player.player_id] || {};
        const isEditing = editingPlayerId === player.player_id;

        return (
          <div
            key={player.player_id}
            className={`playerCard-${currentSelection.team || "unselected"}`}
            onClick={() => handleDivClick(player)}
          >
            <div className="player-card-header">
              {isEditing ? (
                <div
                  className="player-name-edit-form"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="text"
                    className="player-name-input"
                    value={editingName}
                    placeholder="Enter name"
                    autoFocus
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveEdit(e, player.player_id);
                      } else if (e.key === "Escape") {
                        handleCancelEdit(e);
                      }
                    }}
                  />
                  <div className="player-name-edit-actions">
                    <button
                      type="button"
                      className="player-name-save-btn"
                      onClick={(e) => handleSaveEdit(e, player.player_id)}
                      title="Save"
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className="player-name-cancel-btn"
                      onClick={handleCancelEdit}
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="player-name-container">
                  <span className="player-name-display" title={player.player_name}>
                    {player.player_name || <em>Unnamed Player</em>}
                  </span>
                  <button
                    type="button"
                    className="player-edit-btn"
                    onClick={(e) => handleStartEdit(e, player)}
                    title="Edit name"
                    aria-label="Edit name"
                  >
                    ✏️
                  </button>
                </div>
              )}
            </div>

            <div className="counter-container">
              <span className="counter-label">
                Goals Scored: <strong className="counter-val">{currentSelection.goals_scored || 0}</strong>
              </span>
              <div className="counter-btn-group">
                <button
                  type="button"
                  className="counter-btn"
                  value={"-"}
                  onClick={(e) => {
                    e.stopPropagation();
                    goalsScored(e, player);
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  className="counter-btn"
                  value={"+"}
                  onClick={(e) => {
                    e.stopPropagation();
                    goalsScored(e, player);
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="counter-container">
              <span className="counter-label">
                Over the fence: <strong className="counter-val">{currentSelection.kicked_over_fence || 0}</strong>
              </span>
              <div className="counter-btn-group">
                <button
                  type="button"
                  className="counter-btn"
                  value={"-"}
                  onClick={(e) => {
                    e.stopPropagation();
                    overTheFence(e, player);
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  className="counter-btn"
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

            <div className="counter-container">
              <span className="counter-label">
                Own goals: <strong className="counter-val">{currentSelection.own_goals || 0}</strong>
              </span>
              <div className="counter-btn-group">
                <button
                  type="button"
                  className="counter-btn"
                  value={"-"}
                  onClick={(e) => {
                    e.stopPropagation();
                    ownGoals(e, player);
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  className="counter-btn"
                  value={"+"}
                  onClick={(e) => {
                    e.stopPropagation();
                    ownGoals(e, player);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="playerCard-unselected add-player-card" onClick={addNewPlayer}>
        <button type="button" className="add-player-btn">+ Add new Player</button>
      </div>
    </div>
  );
};

export default RecordGameList;