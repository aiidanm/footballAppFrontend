import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
const GameInfo = ({ games, setGames }) => {
  const [sortBy, setSortBy] = useState("date"); // Initial sort field
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order (descending)
  const [filtervalue, setFilterValue] = useState("all");
  const [filterField, setFilterField] = useState("none");
  const [filteredGames, setFilteredGames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

   const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setFilteredGames(sortGames(filteredGames, event.target.value, sortOrder));
  };

  const handleOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setFilteredGames(
      sortGames(filteredGames, sortBy, sortOrder === "asc" ? "desc" : "asc")
    );
  };

  const handleGamesMutation = () => {
    setFilteredGames(sortGames(games, sortBy, sortOrder));
  }
 

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

  let result = [...games];

  if(value === "all" || field === "none"){
    // Return all games
  } else if(field === "player_count"){
    result = result.filter((game) => {
      let playersInvolved = 0;
        for (const team in game.teams){
          playersInvolved += game.teams[team].length
        }
        return playersInvolved.toString() === value;
    });
  }

  setFilteredGames(result);
}






useEffect(() => {
    setFilteredGames(games);
}, [games]);

// On mount, close the sidebar for small screens for better UX
useEffect(() => {
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    setSidebarOpen(false);
  }
}, []);
  return (
    <div className="gameListLayout">
      <aside className={`gameSidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebarContent">
          <h2 className="sidebarTitle">Sort & Filter</h2>
          <button
            className="sidebarCloseX"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
          
          <div className="sidebarSection">
            <label className="sidebarLabel">Sort by:</label>
            <div className="playerSortSelect-wrapper">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="gamesSortSelect"
              >
                <option value="total_goals_scored">Goals Scored</option>
                <option value="biggest_margin">Biggest Margin</option>
                <option value="date">Date</option>
                <option value="player_count">Player count</option>
              </select>
            </div>
            <button onClick={handleOrderChange} className="sortButton">
              {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
            </button>
          </div>

          <div className="sidebarSection">
            <label className="sidebarLabel">Filter by:</label>
            <div className="playerSortSelect-wrapper">
              <select
                onChange={(e) => setFilterField(e.target.value)}
                className="gamesSortSelect"
                value={filterField}
              >
                <option value="none">All Games</option>
                <option value="player_count">Player count</option>
              </select>
            </div>
            {filterField !== "none" && (
              <>
                <input 
                  type="text" 
                  className="filterInput"
                  placeholder="Enter value"
                  value={filtervalue}
                  onChange={(e) => setFilterValue(e.target.value)} 
                />
                <button 
                  onClick={() => filterGames(games, filterField, filtervalue)}
                  className="filterButton"
                >
                  Apply Filter
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      <main className="gameListContent">
        {!sidebarOpen && (
          <div className="filterOpenWrapper">
            <button
              className="filterOpenButton"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open filters"
            >
              ☰ Filters
            </button>
          </div>
        )}
        <div className="gamesContainer">
          {filteredGames.map((game) => 
          {
            let playersInvolved = 0;
            for (const team in game.teams){
              playersInvolved += game.teams[team].length
            }
            return (
            <Link to={`/games/${game.game_id}`} className="recentGameCard" key={game.game_id}>
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
      </main>
    </div>
  );
};

export default GameInfo;
