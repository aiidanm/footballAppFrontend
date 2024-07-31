import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'
import { Link } from 'react-router-dom';


const StatsPage = () => {
    
        return (
            <div className='MainContainer'>
      <Link to="/" className='HomeLink'>
    <h1 className='TitleHeader'>App</h1>
    </Link>
    <h2>Stats</h2>
            <div className='pageContainer'>
                <Link to='/top-scorer' className='icon-button'>
                    <FontAwesomeIcon icon={faEdit} className="icon" />
                    <span className="text">Top Scorer</span>
                </Link>
                <Link to='/top-assists' className='icon-button'>
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Top Assists</span>
                </Link>
                <Link to='/over-the-fences' className='icon-button'>
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                    <span className="text">Most Over the Fences</span>
                </Link>
                <Link to='/win-loss-ratio' className='icon-button'>
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                    <span className="text">Best Win/Loss Ratio</span>
                </Link>
            </div>
            </div>
        );
};

export default StatsPage;
