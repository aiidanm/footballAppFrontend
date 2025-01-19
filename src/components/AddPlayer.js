import React, { useState } from "react";
import "../App.css";
import { addPlayer } from "../ApiFuncs";
import { Link } from "react-router-dom";

const NewPlayer = () => {
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    preferred_position: "",
  });
  const [waiting, setWaiting] = useState(false);

  const handleSave = () => {
    setWaiting(true);
    addPlayer(newPlayer).then(() => {
      setWaiting(false);
      setNewPlayer({
        name: "",
        preferred_position: "",
      });
    });
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <h2>Players</h2>
      {waiting ? (
        <h1>Submitting to server..</h1>
      ) : (
        <div className="new-player-form">
          <label htmlFor="NameEntry">Name:</label>
          <input
            id="NameEntry"
            name="name"
            value={newPlayer.name}
            onChange={handleUpdate}
          />
          <label htmlFor="PositionEntry">Preferred Position</label>
          <select
            name="preferred_position"
            value={newPlayer.preferred_position}
            onChange={handleUpdate}
          >
            <option value="">Select Position</option>{" "}
            {/* Added a default option */}
            <option value="MF">Midfielder</option>
            <option value="DF">Defender</option>
            <option value="GK">Goalkeeper</option>
            <option value="FW">Forward</option>
          </select>
          <button onClick={handleSave}>Add Player</button>{" "}
          {/* Added a button to save */}
        </div>
      )}
    </div>
  );
};

export default NewPlayer;
