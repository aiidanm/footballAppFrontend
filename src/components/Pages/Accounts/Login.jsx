import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/userContext";
import { getRoles } from "../../../ApiFuncs";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState({ status: false, message: "" });

  const onLogin = async (e) => {
    e.preventDefault();
    setWaiting({ status: true, message: "Logging in, please wait" });
    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCreds.user.getIdToken();
      const userData = await getRoles(idToken);
      login(userData);
      setWaiting({ status: false, message: "" });
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      setWaiting({ status: "error", message: "Incorrect email or password" });

      setTimeout(() => {
        setWaiting({ status: false, message: "" });
      }, 3000);
    }
  };

  return (
    <div className="MainContainer">
      <h1 className="TitleHeader">MNF</h1>
      <div className="pageContainer">
        <div className="login_container">
          <form className="login_form">
            <h2>Login</h2>
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
            {waiting.status === "error" ? (
              <div className="passwordErrorMessageDiv">
                <h4 className="passwordErrorMessage">
                  Incorrect password please try again
                </h4>
              </div>
            ) : null}

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
