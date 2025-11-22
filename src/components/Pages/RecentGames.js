import React, { useEffect, useState } from "react";
import "../../App.css";
import { getGames } from "../../ApiFuncs";
import GameList from "./GameList";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const RecentGames = () => {
  const [games, setGames] = useState([]);
  const [waiting, setWaiting] = useState({
    status: true,
    message: "Loading games, please wait.",
  });
const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("uid", uid)
            } else {
              navigate('/login')
            }
          });

    const fetchData = async () => {
      setWaiting({ status: true, message: "Loading games, please wait." });
      const dbgames = await getGames();
      setGames(dbgames);
      setWaiting({ status: false, message: "" });
    };

    fetchData();



  },[navigate]);

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
      {waiting.status ? (
        <h1>{waiting.message}</h1>
      ) : (
        <GameList games={games} setGames={setGames} handleUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default RecentGames;
