import React, { useEffect } from "react";
import "../App.css";

const SubmitPreview = ({
  selectedPlayers,
  handleDivClick,
  goalsScored,
  overTheFence,
  handleSubmit,
}) => {

useEffect(()=>{
    console.log(selectedPlayers)
})

  const filteredPlayers = Object.values(selectedPlayers).filter(
    (player) => player.team === "team1" || player.team === "team2"
  );

  return (
    <div>
      <h2>Confirm Selection</h2>
      {filteredPlayers.map((player) => {
        const currentSelection = player || {};
        return (
          <div
            key={player.id}
            className={`playerCard-${currentSelection.team || "unselected"}`}
          >
            <h3>
              {player.name}
            </h3>
            <p>{player.goals_scored || 0}</p>
          </div>
        );
      })}
      <button onClick={handleSubmit}>Confirm & Submit</button>
    </div>
  );
};

export default SubmitPreview;
