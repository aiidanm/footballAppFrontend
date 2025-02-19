import React, { useEffect } from "react";
import "../App.css";

const SubmitPreview = ({
  selectedPlayers,
  handleDivClick,
  goalsScored,
  overTheFence,
  handleSubmit,
}) => {
  useEffect(() => {
    console.log(selectedPlayers);
  });

  const redTeam = Object.values(selectedPlayers).filter(
    (player) => player.team === "team1"
  );

  const blueTeam = Object.values(selectedPlayers).filter(
    (player) => player.team === "team2"
  );

  return (
    <div>
      <h2>Confirm Selection</h2>
      <div className="red_team_container">
        <h3>Red Team</h3>
        {redTeam.map((player) => {
        const currentSelection = player || {};
        return (<table>
          <tr>
                      <th>Name</th>
                      <th>Goals Scored</th>
                      <th>Over the fence</th>
                    </tr>
          <tr>
                          <td>{player.name}</td>
                          <td>{player.goals_scored || 0}</td>
                          <td>{player.times_over_fence || 0}</td>
                        </tr>
        </table>
        );
      })}
      </div>
      <div className="blue_team_container">
        <h3>blue Team</h3>
        {blueTeam.map((player) => {
        const currentSelection = player || {};
        return (
          <table>
          <tr>
                      <th>Name</th>
                      <th>Goals Scored</th>
                      <th>Over the fence</th>
                    </tr>
          <tr>
                          <td>{player.name}</td>
                          <td>{player.goals_scored || 0}</td>
                          <td>{player.times_over_fence || 0}</td>
                        </tr>
        </table>
        );
      })}
      </div>
      
      <button onClick={handleSubmit}>Confirm & Submit</button>
    </div>
  );
};

export default SubmitPreview;
