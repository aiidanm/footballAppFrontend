import React, { useEffect, useState } from "react";
import { joinLeague } from "../../../ApiFuncs";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase";
import {useAuth} from "../../../contexts/userContext"
import Header from "../header"

import { useNavigate } from "react-router-dom";

const JoinLeague = () => {
  const navigate = useNavigate();

  const [waiting, setWaiting] = useState({ status: false, message: "" });
  const [leagueCode, setLeagueCode] = useState("")
  const {user, loading, login} = useAuth()
  

  if(loading) return <div>Loading...</div>

  if(!user){
    navigate("/login")
    return null
  }

  const handleJoin = (e) => {
    e.preventDefault();
    setWaiting({ status: true, message: "joining" });

    const joiningUserData = {
      uid: user.uid,
      playerName: user.email,
      leagueCode: leagueCode,
      email: user.email
    }
    joinLeague(joiningUserData).then(() => {
      setWaiting({status:false, message: ""})
    })
  };

  return (
    <div className="MainContainer">
      <Header />
      <div className="pageContainer">
        <div className="login_container">
          <form className="login_form">
            <h2>Join league</h2>
            <div className="login-pair">
              <label htmlFor="email-address" className="login_label">
                League Code
              </label>
              <input
                id="league-code"
                name="league-code"
                type="league-code"
                required
                placeholder="league code"
                onChange={(e) => setLeagueCode(e.target.value)}
              />
            </div>
            {waiting.status === "error" ? (
              <div className="passwordErrorMessageDiv">
                <h4 className="passwordErrorMessage">
                  league code not found , please check your spelling or contact
                  your league admin again
                </h4>
              </div>
            ) : null}

            <button className="login-button login" onClick={handleJoin}>
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinLeague;
