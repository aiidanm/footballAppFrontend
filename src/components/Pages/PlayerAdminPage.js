import React from 'react';
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PlayerAdminPage = () => {
    
        return (
            <div className='MainContainer'>
                <Link to="/" className='HomeLink'>
    <h1 className='TitleHeader'>App</h1>
    </Link>
                <h2>Player admin</h2>
                <div className='pageContainer'>
                    <Link to='/edit-player' className='icon-button'>
                        <FontAwesomeIcon icon={faEdit} className="icon" />
                        <span className="text">Edit Player</span>
                    </Link>
                    <Link to='/add-player' className='icon-button'>
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                        <span className="text">Add a New Player</span>
                    </Link>
                    <Link to='/delete-player' className='icon-button'>
                        <FontAwesomeIcon icon={faTrash} className="icon" />
                        <span className="text">Delete Player</span>
                    </Link>
                </div>
            </div>
        );
};

export default PlayerAdminPage;