import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
const GameInfo = ({ games, setGames }) => {
  const [sortBy, setSortBy] = useState("date"); // Initial sort field
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order (descending)

   const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setGames(sortGames(games, event.target.value, sortOrder));
  };

  const handleOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setGames(
      sortGames(games, sortBy, sortOrder === "asc" ? "desc" : "asc")
    );
  };
 

const sortGames = (games, field, order) => {
  const sortedGames = [...games];

  sortedGames.sort((a, b) => {

      let aValue;
      let bValue;
      let marginA = Math.abs(a.team1_score - a.team2_score);
      let marginB = Math.abs(b.team1_score - b.team2_score);

      let playersInvolvedGame1 = 0;
        for (const team in a.teams){
          playersInvolvedGame1 += a.teams[team].length
        }

        let playersInvolvedGame2 = 0;
        for (const team in b.teams){
          playersInvolvedGame2 += b.teams[team].length
        }

      if (field === "total_goals_scored") {
        aValue = a.team1_score + a.team2_score;
        bValue = b.team1_score + b.team2_score;
      }  else if (field === "biggest_margin") {
        aValue = marginA;    
        bValue = marginB
      } else if (field === "date"){
        aValue = new Date(a.game_date);
        bValue = new Date(b.game_date);
      } else if (field === "player_count") {
        aValue = playersInvolvedGame1
        bValue = playersInvolvedGame2
      } 
      if (order === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
  });

  return sortedGames;
  
}

const filterGames = (games, field, value) => {
  return games.filter((game) => game[field] === value);
}

const handleFilterChange = (event) => {
  const value = event.target.value;
  if (value === "all") {
    setGames(games);
  } else {
    setGames(filterGames(games, "some_field", value)); // Replace "some_field" with actual field to filter by
  }
}

useEffect(() => {
  sortGames(games, "game_date", "asc");
}, []);
  return (
    <div className="pageContainer">
      <div className="sortContainer">
            <label htmlFor="gamesSortSelect" className="sortByLabel">
              Sort by:
            </label>
            <div class="playerSortSelect-wrapper">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="gamesSortSelect"
              >
                <option value="total_goals_scored">Goals Scored</option>
                <option value="biggest_margin">Biggest Margin</option>
                <option value="date">Date</option>
                <option value="player_count">player count</option>
              </select>
            </div>
            <button onClick={handleOrderChange} className="sortButton">
              Toggle Order ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <div className="playerSortSelect-wrapper">
              <h3>Filter</h3>
              <select
                onChange={handleFilterChange}
                className="gamesSortSelect"
              >
                <option value="all">All Games</option>
                <option value="some_value">Some Filter</option>
              </select>
              
            </div>
          </div>
      {games.map((game) => 
      {
        let playersInvolved = 0;
        for (const team in game.teams){
          playersInvolved += game.teams[team].length
        }
        return (
        <Link to={`/games/${game.game_id}`} className="recentGameCard">
          <p>
            Game Date:{" "}
            {new Intl.DateTimeFormat("en-GB").format(new Date(game.game_date))}
          </p>
          <p>Red team score: {game.team1_score} </p>
          <p>Blue team score: {game.team2_score}</p>
          <p>Players involved: {playersInvolved}</p>
        </Link>
      )})}
    </div>
  );
};

export default GameInfo;
