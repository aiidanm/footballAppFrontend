import React, { useState } from 'react';
import axios from 'axios';

const AddPlayer = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/players', { name, preferred_position: position });
    setName('');
    setPosition('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Preferred Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
      </div>
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayer;
