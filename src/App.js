import React from 'react';
import AddPlayer from './components/AddPlayer';
import RecordGame from './components/RecordGame';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <h1 className='AppTitle'>Football Stats Tracker</h1>
      <HomePage/>
    </div>
  );
}

export default App;
