import React, { useState, useMemo } from "react";
import "../../../App.css";
import { Link } from "react-router-dom";
const GameInfo = ({ games, setGames, handleUpdate, year, setYear}) => {
  const [sort, setSort] = useState({ by: "date", order: "asc" });
  const [filter, setFilter] = useState({ field: "none", value: "all" });
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );

  const handleSortChange = (e) => {
    setSort((prev) => ({ ...prev, by: e.target.value }));
  };
  const handleOrderChange = () => {
    setSort((prev) => ({ ...prev, order: prev.order === "asc" ? "desc" : "asc" }));
  };
  const handleFilterFieldChange = (e) => {
    setFilter({ field: e.target.value, value: "all" });
  };
  const handleFilterValueChange = (e) => {
    setFilter((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleYearChange = (e) => {
    setYear(e.target.value)
  }
 

  const getPlayerCount = (game) =>
    Object.values(game.teams).reduce((acc, team) => acc + team.length, 0);

  const filterValueArray = useMemo(() => {
    if (filter.field === "player_count") {
      return Array.from(
        new Set(games.map(getPlayerCount))
      )
        .sort((a, b) => b - a)
        .map((num) => num.toString());
    } else if(filter.field === "winning-team"){
      return ["Red Team", "Blue Team", "draw"];
    } else if(filter.field === "total goals scored"){
      return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((num) => num.toString());
    }
    return [];
  }, [games, filter.field]);

  const filteredGames = useMemo(() => {
    let result = [...games];
    if (filter.field === "player_count" && filter.value !== "all") {
      result = result.filter(
        (game) => getPlayerCount(game).toString() === filter.value
      );
    } else if(filter.field === "winning-team"){
      result = result.filter(
        (game) => {
          if(filter.value === "Red Team" && game.team1_score > game.team2_score){
            return true;
          } else if(filter.value === "Blue Team" && game.team2_score > game.team1_score){
            return true;
          } else if(filter.value === "draw" && game.team1_score === game.team2_score){
            return true;
          }
          return false;
        }
      );
    }
    
    result.sort((a, b) => {
      let aValue, bValue;
      const marginA = Math.abs(a.team1_score - a.team2_score);
      const marginB = Math.abs(b.team1_score - b.team2_score);
      const playersA = getPlayerCount(a);
      const playersB = getPlayerCount(b);
      switch (sort.by) {
        case "total_goals_scored":
          aValue = a.team1_score + a.team2_score;
          bValue = b.team1_score + b.team2_score;
          break;
        case "biggest_margin":
          aValue = marginA;
          bValue = marginB;
          break;
        case "date":
          aValue = new Date(a.game_date);
          bValue = new Date(b.game_date);
          break;
        case "player_count":
          aValue = playersA;
          bValue = playersB;
          break;
        default:
          aValue = 0;
          bValue = 0;
      }
      if (sort.order === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
    return result;
  }, [games, sort, filter]);

  return (
    <div className="gameListLayout">
      <aside className={`gameSidebar ${sidebarOpen ? "open" : "closed"}`}>
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
            <label className="sidebarLabel">Year</label>
            <select
            onChange={handleYearChange}
            className="gamesSortSelect"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="sidebarSection">
            <label className="sidebarLabel">Sort by:</label>
            <div className="playerSortSelect-wrapper">
              <select
                value={sort.by}
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
              {sort.order === "asc" ? "↑ Ascending" : "↓ Descending"}
            </button>
          </div>
          <div className="sidebarSection">
            <label className="sidebarLabel">Filter by:</label>
            <div className="playerSortSelect-wrapper">
              <select
                onChange={handleFilterFieldChange}
                className="gamesSortSelect"
                value={filter.field}
              >
                <option value="none">All Games</option>
                <option value="player_count">Player count</option>
                <option value="winning-team">Winning Team</option>
                <option value="total goals scored">Total Goals Scored</option>
              </select>
            </div>
            {filter.field !== "none" && (
              <>
                <select onChange={handleFilterValueChange} value={filter.value}>
                  <option value="all">All</option>
                  {filterValueArray.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
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
          <button onClick={handleUpdate}>Reset</button>
          {filteredGames.map((game) => (
            <Link to={`/games/${game.game_id}`} className="recentGameCard" key={game.game_id}>
              <p>
                Game Date: {new Intl.DateTimeFormat("en-GB").format(new Date(game.game_date))}
              </p>
              <p>Red team score: {game.team1_score} </p>
              <p>Blue team score: {game.team2_score}</p>
              <p>Players involved: {getPlayerCount(game)}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GameInfo;
