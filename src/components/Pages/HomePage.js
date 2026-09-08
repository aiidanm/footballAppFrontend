import React from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase";
import {useAuth} from "../../contexts/userContext"
import {
  faUserEdit,
  faClipboardList,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header"


const HomePage = () => {
  const {user, login, logout} = useAuth()
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        logout()
        navigate("/login");
      })
      .catch((error) => {});
  };

console.log(user)
 if (!user) {
    navigate("/Landing");
    return null;
  }

  return (
    <div className="MainContainer">
      <Header />
      <h2>Home</h2>
      <div className="pageContainer">
        <Link to="/Players" className="icon-button">
          <FontAwesomeIcon icon={faUserEdit} className="icon" />
          <span className="text">Player page</span>
        </Link>
        {user.role === 'admin' ? <Link to="/RecordGame" className="icon-button">
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          <span className="text">Record a game</span>
        </Link> : null}
        
        <Link to="/Games" className="icon-button">
          <FontAwesomeIcon icon={faGamepad} className="icon" />
          <span className="text"> Recent Games</span>
        </Link>
        {user.league_id === null ? <Link to="/joinLeague" className="icon-button">
            <FontAwesomeIcon icon={faClipboardList} className="icon"/>
            <span className="text">Join league</span>
        </Link> : null}
         {user.league_id !== null ? <Link to="/settings" className="icon-button">
            <FontAwesomeIcon icon={faClipboardList} className="icon"/>
            <span className="text">Settings</span>
        </Link> : null}
     
      </div>
    </div>
  );
};

export default HomePage;
