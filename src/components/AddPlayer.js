import React, { useState, useEffect} from "react";
import "../App.css";
import { addPlayer } from "../ApiFuncs";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const NewPlayer = () => {
  const [players, setPlayers] = useState([{
    name: "",
    preferred_position: "",
  }]);
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

    }, [])

  const handleSave = () => {
    setWaiting(true);
    addPlayer(players).then(() => {
      setWaiting(false);
      setPlayers([{
        name: "",
        preferred_position: "",
      }]);
    });
  };

  const handleAddFields = () => {
    setPlayers([...players, {name: '', preferred_position: ''}])
  }

  const handleRemoveFields = (index) => {
    const newPlayers = [...players]
    newPlayers.splice(index, 1)
    setPlayers(newPlayers)
  }

  const handleUpdate = (index, e) => {
    const { name, value } = e.target;
    const newPlayers = [...players]
    newPlayers[index][name] = value
    setPlayers(newPlayers);
  };

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <h2>Players</h2>
      {waiting ? (
        <h1>Submitting to server..</h1>
      ) : 
        <div className="edit-form">
          <form className="login_form" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            {players.map((player, index) => (
          <div key={index} className="input-group">
          <div className="login-pair">
              <label htmlFor="NameEntry" className="login_label">Name:</label>
              <input
                id={'NameEntry-' + index}
                name="name"
                value={player.name}
                onChange={(e) => handleUpdate(index, e)}
                required
              />
            </div>
            <div className="login-pair">
              <label htmlFor="PositionEntry" className="login_label">Preferred Position</label>
              <select
                id={"PositionEntry-"+ index}
                name="preferred_position"
                value={player.preferred_position}
                onChange={(e) => handleUpdate(index, e)}
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
            {players.length > 1 && (
              <button className="remove-input-button" type="button" onClick={() => handleRemoveFields(index)}>
                Remove
              </button>
            )}
            </div>
      ))}   
            <button type="button" onClick={handleAddFields} style={{ marginRight: '10px' }}>
            + Add Another Player
          </button>
            <button type="submit">Submit to database</button>
          </form>
        </div>
      }
    </div>
  );
};

export default NewPlayer;
