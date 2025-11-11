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

      const dateA = new Date(a.game_date);
      const dateB = new Date(b.game_date);

    

      return dateB - dateA;
  });

  setGames(sortedGames);
  
}

useEffect(() => {
  sortGames(games, "game_date", "desc");
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
                <option value="Wins">Wins</option>
                <option value="Win_Ratio">Win ratio</option>
                <option value="Games_Played">Games played</option>
              </select>
            </div>
            <button onClick={handleOrderChange} className="sortButton">
              Toggle Order ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
          </div>
      {games.map((game) => (
        <Link to={`/games/${game.game_id}`} className="recentGameCard">
          <p>
            Game Date:{" "}
            {new Intl.DateTimeFormat("en-GB").format(new Date(game.game_date))}
          </p>
          <p>Red team score: {game.team1_score} </p>
          <p>Blue team score: {game.team2_score}</p>
        </Link>
      ))}
    </div>
  );
};

export default GameInfo;
