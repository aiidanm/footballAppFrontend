import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";
import {useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState({status: false, message: ""})

  const onLogin = (e) => {
    e.preventDefault();
    setWaiting({status: true, message: "Logging in, please wait"})
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setWaiting({ status: false, message: "" });
        navigate("/");
      })
      .catch((error) => {
        setWaiting({ status: "error", message: "incorrect password, try again" });
        setTimeout(() => {
          setWaiting({ status: false, message: "" });
        }, 3000);
        console.log(error)
      });
  };


  return (
    <div className="MainContainer">
      <h1 className="TitleHeader">MNF</h1>
      <div className="pageContainer">
        <div className="login_container">
          <form className="login_form">
            <div className="login-pair">
              <label htmlFor="email-address" className="login_label">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-pair">
              <label htmlFor="password" className="login_label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {waiting.status === "error" ?(<div className="passwordErrorMessageDiv">
              <h4 className="passwordErrorMessage">Incorrect password please try again</h4>
            </div>): null }
            
            <button className="login-button login" onClick={onLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
