import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerGameInput = ({player, handleChange, index}) => {

    return (
        <div className='PlayerGameInput'>
        <label>
            Played:
            <input
              type="checkbox"
              onChange={(e) => handleChange(index, 'played', e.target.checked, player)}
            />
          </label>
          <label>
            Scored:
            <input
              type="number"
              onChange={(e) => handleChange(index, 'scored', e.target.value, player)}
            />
          </label>
          <label>
            Assisted:
            <input
              type="number"
              onChange={(e) => handleChange(index, 'assisted', e.target.value, player)}
            />
          </label>
          </div>
    )
}

export default PlayerGameInput