import React, { useState, useEffect} from "react";
import "../App.css";
import { addPlayer } from "../ApiFuncs";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const NewPlayer = () => {
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    preferred_position: "",
  });
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate()

  useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("uid", uid)
            } else {
              navigate('/login')
            }
          });

    })

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
        <div className="edit-form">
          <form className="login_form" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <div className="login-pair">
              <label htmlFor="NameEntry" className="login_label">Name:</label>
              <input
                id="NameEntry"
                name="name"
                value={newPlayer.name}
                onChange={handleUpdate}
                required
              />
            </div>
            <div className="login-pair">
              <label htmlFor="PositionEntry" className="login_label">Preferred Position</label>
              <select
                id="PositionEntry"
                name="preferred_position"
                value={newPlayer.preferred_position}
                onChange={handleUpdate}
                className="playerSortSelect"
                required
              >
                <option value="">Select Position</option>
                <option value="MF">Midfielder</option>
                <option value="DF">Defender</option>
                <option value="GK">Goalkeeper</option>
                <option value="FW">Forward</option>
              </select>
            </div>
            <button type="submit">Add Player</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewPlayer;
