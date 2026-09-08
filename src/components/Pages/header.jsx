import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import {useAuth} from "../../contexts/userContext"

import "../../App.css";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
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
 if (!user) {
    navigate("/Landing");
    return null;
  }

  return (
    <div className="MainContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      {user.playerName && <p>{user.playerName}</p>}
      {user.league_name && <p>League: {user.league_name}</p>}
      <button className="logoutButton" onClick={handleLogout}>Logout</button>
    </div>
  );

};

export default Header;
