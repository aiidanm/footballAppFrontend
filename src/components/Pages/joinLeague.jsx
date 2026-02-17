import React, { useEffect, useState } from "react";
import { joinLeague } from "../../ApiFuncs";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { auth } from "../Firebase";



import {useNavigate } from "react-router-dom";

const JoinLeague = () => {
  const navigate = useNavigate();

  const [waiting, setWaiting] = useState({status: false, message: ""})
const [joiningUser, setJoiningUser] = useState({})


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user)
            setJoiningUser({uid: user.uid, Name: user.email, leagueCode: "" })
          } else {
            navigate("/Landing");
          }
        });
  }, [])

  const handleLeagueCodeChange = (e) => {
    let lc = e.target.value
    setJoiningUser((prev) => {return {...prev, leagueCode: lc}})
  }

  const handleJoin = (e) => {
    e.preventDefault()
    setWaiting({status: true, message: "joining"})
    joinLeague(joiningUser)
  }


  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
              <h1 className="TitleHeader">MNF</h1>
        </Link>
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
                onChange={handleLeagueCodeChange}
              />
            </div>
            {waiting.status === "error" ?(<div className="passwordErrorMessageDiv">
              <h4 className="passwordErrorMessage">league code not found , please check your spelling or contact your league admin again</h4>
            </div>): null }
            
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
