import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerGameInput = ({player, handleChange, index}) => {

    return (
        <div className='PlayerGameInput'>
        <label>
            Played:
            <select name="played" id="played">
              <option value="no">No</option>
  <option value="blue">Blue team</option>
  <option value="red">Red team</option>
</select>
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