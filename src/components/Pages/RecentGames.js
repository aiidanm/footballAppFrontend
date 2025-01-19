import React, { useEffect, useState } from "react";
import "../../App.css";
import { getGames } from "../../ApiFuncs";
import GameInfo from "./GameInfo";
import { Link } from "react-router-dom";

const RecentGames = () => {
  const [games, setGames] = useState([]);
  const [waiting, setWaiting] = useState({
    status: true,
    message: "Loading games, please wait.",
  });

  useEffect(() => {
    const fetchData = async () => {
      setWaiting({ status: true, message: "Loading games, please wait." });
      const dbgames = await getGames();
      setGames(dbgames);
      setWaiting({ status: false, message: "" });
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    setWaiting({ status: true, message: "Refreshing games, please wait." });
    const dbgames = await getGames();
    setGames(dbgames);
    setWaiting({ status: false, message: "" });
  };

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <h2>Recent games</h2>
      <button onClick={handleUpdate}>Update list</button>
      {waiting.status ? (
        <h1>{waiting.message}</h1>
      ) : (
        <GameInfo games={games} setGames={setGames} />
      )}
    </div>
  );
};

export default RecentGames;
