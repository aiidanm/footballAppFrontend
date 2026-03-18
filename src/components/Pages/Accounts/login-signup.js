import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState({ status: false, message: "" });

  const buttonClicked = (e) => {
    navigate(`/${e.target.outerText}`);
  };

  return (
    <div className="MainContainer">
      <h1 className="TitleHeader">MNF</h1>
      <div className="pageContainer">
        <div className="login_container">
          <button className="login-button login" onClick={buttonClicked}>
            Login
          </button>
          <button className="login-button login" onClick={buttonClicked}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
