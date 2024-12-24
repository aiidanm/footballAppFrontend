import React from 'react';
import { Link } from 'react-router-dom';

const EditPlayerForm = ({ title, player, setPlayer, handleSave }) => {

  const handleCancel = () => {
    setPlayer(null);  
}

  return (
    <div className="edit-form">
      <h3>{title}</h3>
      <label>
        Name:
        <input
          type="text"
          value={player.name}
          onChange={(e) => setPlayer({ ...player, name: e.target.value })}
        />
      </label>
      <label>
        Position:
        <input
          type="text"
          value={player.preferred_position}
          onChange={(e) =>
            setPlayer({ ...player, preferred_position: e.target.value })
          }
        />
      </label>
     
      {title === "Edit Player" ? <Link to="/playerList"onClick={handleSave} className='icon-button'>Save</Link> : <Link to="/Players" onClick={handleSave} className='icon-button'>Save</Link>}
      {title === "Edit Player" ? <Link to="/playerList"onClick={handleCancel} className='icon-button'>Cancel</Link> : <Link to="/Players" className='icon-button'>Cancel</Link>}
    </div>
  );
};

export default EditPlayerForm;
