import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
    


        return (
            <div className='HomePage'>
            <button className='stats-page-button'>Stats page</button>
            <button className='player-update-button'>Player Admin</button>
            <button className='record-game-button'>Record a game</button>
            <button className='view-games-button'>View games</button>
            </div>
        );
};

export default HomePage;