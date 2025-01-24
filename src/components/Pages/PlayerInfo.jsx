import React, { useEffect, useState } from "react";
import "../../App.css";
import { useSearchParams, useParams } from "react-router-dom";
import { getPlayerById } from "../../ApiFuncs";
import { Link } from "react-router-dom";

const PlayerStats = () => {
  const { playerid } = useParams();
  const [player, setPlayer] = useState({});
  const [waiting, setWaiting] = useState({
    status: true,
    message: "Loading player stats, please wait.",
  });

  useEffect(() => {
    getPlayerById(playerid).then((data) => {
        setWaiting({status: false, message: ""})
        setPlayer(data)
    })
  }, []);

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <div className="Player_Stats_Page">
        {waiting.status ? (
          <h1>{waiting.message}</h1>
        ) : (
            <div className="player_stats_container">
                <p>{player.player_name}</p>

            </div>
        )}
      </div>
    </div>
  );
};

export default PlayerStats;
 