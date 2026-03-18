import React, { useEffect, useState, useMemo } from "react";
import "../../../App.css";
import { getPlayers } from "../../../ApiFuncs";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [sort, setSort] = useState({ by: "Win Ratio", order: "↓ Descending" });
  const [year, setYear] = useState("2026");
  const [waiting, setWaiting] = useState({
    status: false,
    message: "loading players please wait",
  });
  const [filter, setFilter] = useState({
    field: "none",
    value: "all",
    operator: "equals",
  });
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true,
  );

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleFilterFieldChange = (e) => {
    setFilter({ field: e.target.value, value: "all" });
  };
  const handleFilterValueChange = (e) => {
    setFilter((prev) => ({ ...prev, value: e.target.value }));
  };
  const handleFilterOperatorChange = (e) => {
    setFilter((prev) => ({ ...prev, operator: e.target.value }));
  };

  const calculateForm = (formString) => {
    if (!formString) return 0;
    return formString.split("").reduce((acc, curr) => {
      if (curr === "W") {
        return acc + 1;
      } else if (curr === "L") {
        return acc - 1;
      } else if (curr === "D") {
        return acc;
      }
      return acc;
    }, 0);
  };

  const navigate = useNavigate();

  useEffect(() => {
    setWaiting({ status: true, message: "loading players please wait" });
    getPlayers(year).then((data) => {
      setWaiting({ status: false, message: "loading players please wait" });
      let thisyearsPlayers = data.filter(
        (player) => player.games_played !== "0",
      );
      setPlayers(thisyearsPlayers);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
      } else {
        navigate("/login");
      }
    });
  }, [navigate, year]);

  const handleSortChange = (e) => {
    setSort((prev) => ({ ...prev, by: e.target.value }));
  };
  const handleOrderChange = () => {
    setSort((prev) => ({
      ...prev,
      order: prev.order === "↑ Ascending" ? "↓ Descending" : "↑ Ascending",
    }));
  };

  const filteredPlayers = useMemo(() => {
    let result = players.filter((player) => player.games_played !== "0");
    let compareString = filter.operator;
    let filterValue = filter.value;
    if (filterValue !== "all" && compareString !== "all") {
      result = result.filter((player) => {
        let playerValue;

        switch (filter.field) {
          case "games_played":
            playerValue = player.games_played;
            break;

          case "goals scored":
            playerValue = player.total_goals_scored;
            break;

          case "Win ratio":
            playerValue = (player.total_wins / player.games_played).toFixed(2);
            break;
          default:
            return true;
        }

        const numPlayerValue = Number(playerValue);
        const numFilterValue = Number(filterValue);

        switch (compareString) {
          case "===":
            return playerValue.toString() === filterValue.toString();
          case ">=":
            return numPlayerValue >= numFilterValue;
          case "<=":
            return numPlayerValue <= numFilterValue;
          case "&&":
            const [min, max] = filterValue.split("-").map(Number);
            return numPlayerValue >= min && numPlayerValue <= max;
          default:
            return false;
        }
      });
    }

    result.sort((a, b) => {
      let aValue, bValue;
      switch (sort.by) {
        case "total goals scored":
          aValue = a.total_goals_scored;
          bValue = b.total_goals_scored;
          break;
        case "Games Played":
          aValue = a.games_played;
          bValue = b.games_played;
          break;
        case "Wins":
          aValue = a.total_wins;
          bValue = b.total_wins;
          break;
        case "Goals Per Game":
          aValue = a.total_goals_scored / a.games_played;
          bValue = b.total_goals_scored / b.games_played;
          break;
        case "Win Ratio":
          aValue = (a.total_wins / a.games_played).toFixed(2);
          bValue = (b.total_wins / b.games_played).toFixed(2);
          break;
        case "Form":
          aValue = calculateForm(a.form);
          bValue = calculateForm(b.form);
          break;
        case "Own Goals":
          aValue = a.own_goals;
          bValue = b.own_goals;
          break;
        default:
          aValue = 0;
          bValue = 0;
      }
      if (sort.order === "↑ Ascending") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
    return result;
  }, [players, sort, filter]);

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
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
      <h2>Players</h2>
      <h3>
        Sorted by {sort.by}, {sort.order}
      </h3>
      {waiting.status ? (
        <h2>{waiting.message}</h2>
      ) : (
        <>
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
              \
              <div className="sidebarSection">
                <label className="sidebarLabel">Year</label>
                <select onChange={handleYearChange} className="gamesSortSelect">
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
                    <option value="total goals scored">Goals Scored</option>
                    <option value="total kicked_over fence">
                      Over the fence
                    </option>
                    <option value="Goals Per Game">Goals per game</option>
                    <option value="Wins">Wins</option>
                    <option value="Win Ratio">Win ratio</option>
                    <option value="Games Played">Games played</option>
                    <option value="Form">Form</option>
                    <option value="Own Goals">Own Goals</option>
                  </select>
                </div>
                <button onClick={handleOrderChange} className="sortButton">
                  {sort.order === "↑ Ascending"
                    ? "↑ Ascending"
                    : "↓ Descending"}
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
                    <option value="none">All Players</option>
                    <option value="games_played">Games played</option>
                    <option value="goals scored">Goals Scored</option>
                    <option value="Win ratio">Win Ratio</option>
                  </select>
                </div>
                {filter.field !== "none" && (
                  <>
                    <select
                      onChange={handleFilterOperatorChange}
                      className="gamesSortSelect"
                    >
                      <option value={"all"}>Select Operator</option>
                      <option value={"==="}>Equals</option>
                      <option value={">="}>Greater or equal to</option>
                      <option value={"<="}> less or equal to</option>
                      <option value={"&&"}>Between (e.g 10-12)</option>
                    </select>
                    <input
                      onChange={handleFilterValueChange}
                      value={filter.value}
                    ></input>
                  </>
                )}
              </div>
            </div>
          </aside>

          <div className="Players">
            {filteredPlayers.map((player) => (
              <Link
                to={`/players/${player.player_id}`}
                className="playerCard-list"
              >
                <h2 className="playerName">{player.player_name}</h2>
                <div className="playerCard-Section2">
                  <div className="playerCard-left">
                    <h3>Stats</h3>
                    <p>Total Goals: {player.total_goals_scored}</p>
                    <p>Form. (oldest to newest) {player.form}</p>
                    <p>Own Goals: {player.own_goals}</p>
                    <p>Games Played: {player.games_played}</p>
                    <p>Wins: {player.total_wins}</p>
                  </div>
                  <div className="playerCard-right">
                    <h3>Per Game Stats</h3>
                    <p>
                      GPG:{" "}
                      {isNaN(
                        (
                          player.total_goals_scored / player.games_played
                        ).toFixed(2),
                      )
                        ? 0
                        : (
                            player.total_goals_scored / player.games_played
                          ).toFixed(2)}
                    </p>

                    <p>
                      Win ratio:{" "}
                      {isNaN(
                        (player.total_wins / player.games_played).toFixed(2),
                      )
                        ? 0
                        : (player.total_wins / player.games_played).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerList;
