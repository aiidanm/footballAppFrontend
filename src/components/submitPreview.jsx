import "../App.css";

const SubmitPreview = ({
  selectedPlayers,
  handleDivClick,
  goalsScored,
  overTheFence,
  handleSubmit,
  setSubmitPage
}) => {

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
        <h3>red Team</h3>
          <h4>Goals:{redTeam.reduce((total, player) => total + (player.goals_scored || 0), 0)}</h4>
            <h5>Player Count: {redTeam.length}</h5>
            <table>
              <tr>
                <th>Name</th>
                <th>Goals Scored</th>
                <th>Over the fence</th>
              </tr>
              {redTeam.map((player) => {
                return (
                  <tr>
                    <td>{player.name}</td>
                    <td>{player.goals_scored || 0}</td>
                    <td>{player.kicked_over_fence || 0}</td>
                  </tr>
                );
              })}
            </table>
        
      </div>
      <div className="blue_team_container">
        <h3>blue Team</h3>
        <h4>Goals:{blueTeam.reduce((total, player) => total + (player.goals_scored || 0), 0)}</h4>
            <h5>Player Count:{blueTeam.length}</h5>
            <table>
              <tr>
                <th>Name</th>
                <th>Goals Scored</th>
                <th>Over the fence</th>
              </tr>
              {blueTeam.map((player) => {
                return (
                  <tr>
                    <td>{player.name}</td>
                    <td>{player.goals_scored || 0}</td>
                    <td>{player.kicked_over_fence || 0}</td>
                  </tr>
                );
              })}
            </table>
        
      </div>
      <button onClick={() => {setSubmitPage(false)}}>Go Back</button>
      <button onClick={handleSubmit}>Confirm & Submit</button>
    </div>
  );
};

export default SubmitPreview;
