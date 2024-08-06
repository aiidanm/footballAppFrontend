import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUserEdit, faClipboardList, faGamepad } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    
    <div className='MainContainer'>
      <Link to="/" className='HomeLink'>
    <h1 className='TitleHeader'>App</h1>
    </Link>
    <h2>Home</h2>
    <div className='pageContainer'>
      <Link to="/Stats" className="icon-button">
        <FontAwesomeIcon icon={faChartLine} className="icon" />
        <span className="text">Stats page</span>
      </Link>
      <Link to='/Players' className="icon-button">
        <FontAwesomeIcon icon={faUserEdit} className="icon" />
        <span className="text">Player Admin</span>
      </Link>
      <Link to="/RecordGame" className="icon-button">
        <FontAwesomeIcon icon={faClipboardList} className="icon" />
        <span className="text">Record a game</span>
      </Link>
      <Link to="/ViewGames" className="icon-button">
        <FontAwesomeIcon icon={faGamepad} className="icon" />
        <span className="text">View games</span>
      </Link>
    </div>
  </div>
  );
};

export default HomePage;
