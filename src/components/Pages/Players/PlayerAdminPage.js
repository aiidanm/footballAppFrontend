import React from "react";
import { useEffect } from "react";
import "../../../App.css";
import { auth } from "../../Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../header";

const PlayerAdminPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        navigate("/login");
      }
    });
  });

  return (
    <div className="MainContainer">
      <Header />
      <h2>Player admin</h2>
      <div className="pageContainer">
        <Link to="/add-player" className="icon-button">
          <FontAwesomeIcon icon={faPlus} className="icon" />
          <span className="text">Add a New Player</span>
        </Link>
        <Link to="/playerList" className="icon-button">
          <FontAwesomeIcon icon={faEdit} className="icon" />
          <span className="text">Player List</span>
        </Link>
      </div>
    </div>
  );
};

export default PlayerAdminPage;
