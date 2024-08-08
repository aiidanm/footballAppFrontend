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
      <label>
        Goals:
        <input
          type="number"
          value={player.goals}
          onChange={(e) =>
            setPlayer({ ...player, goals: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Assists:
        <input
          type="number"
          value={player.assists}
          onChange={(e) =>
            setPlayer({ ...player, assists: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Games Played:
        <input
          type="number"
          value={player.games_played}
          onChange={(e) =>
            setPlayer({ ...player, games_played: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Over Fence:
        <input
          type="number"
          value={player.over_fence}
          onChange={(e) =>
            setPlayer({ ...player, over_fence: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Wins:
        <input
          type="number"
          value={player.wins}
          onChange={(e) =>
            setPlayer({ ...player, wins: parseInt(e.target.value) })
          }
        />
      </label>
      {title === "Edit Player" ? <Link to="/playerList"onClick={handleSave} className='icon-button'>Save</Link> : <Link to="/Players" onClick={handleSave} className='icon-button'>Save</Link>}
      {title === "Edit Player" ? <Link to="/playerList"onClick={handleCancel} className='icon-button'>Cancel</Link> : <Link to="/Players" className='icon-button'>Cancel</Link>}
    </div>
  );
};

export default EditPlayerForm;
