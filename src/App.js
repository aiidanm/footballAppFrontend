import React from 'react';
import AddPlayer from './components/AddPlayer';
import RecordGame from './components/RecordGame';

function App() {
  return (
    <div>
      <h1>Football Stats Tracker</h1>
      <AddPlayer />
      <RecordGame />
    </div>
  );
}

export default App;
