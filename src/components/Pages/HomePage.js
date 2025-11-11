import React from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase";
import {
  faUserEdit,
  faClipboardList,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        navigate("/login");
      }
    });
  });

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <button className="logoutButton" onClick={handleLogout}>Logout</button>
      <h2>Home</h2>
      <div className="pageContainer">
        <Link to="/Players" className="icon-button">
          <FontAwesomeIcon icon={faUserEdit} className="icon" />
          <span className="text">Player page</span>
        </Link>
        <Link to="/RecordGame" className="icon-button">
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          <span className="text">Record a game</span>
        </Link>
        <Link to="/Games" className="icon-button">
          <FontAwesomeIcon icon={faGamepad} className="icon" />
          <span className="text"> Recent Games</span>
        </Link>
        <Link to="/aiReq" className="icon-button">
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          <span className="text">Ai Request</span>
        </Link>
        <Link to="/stats" className="icon-button">
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          <span className="text">Stats</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
