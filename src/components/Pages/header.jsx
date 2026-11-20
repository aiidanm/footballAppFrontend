import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useAuth } from "../../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        logout();
        navigate("/login");
      })
      .catch(() => {});
  };

  if (!user) {
    navigate("/Landing");
    return null;
  }

  return (
    <header className="appHeader">
      <div className="appHeaderBar">
        <button
          className="headerIconButton logoutIconButton"
          onClick={handleLogout}
          type="button"
          aria-label="Log out"
          title="Log out"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>

        <Link to="/" className="HomeLink">
          <h1 className="TitleHeader">MNF</h1>
        </Link>

        {user.role === "admin" && user.league_id !== null ? (
          <Link
            to="/settings"
            className="headerIconButton settingsIconButton"
            aria-label="Settings"
            title="Settings"
          >
            <FontAwesomeIcon icon={faCog} />
          </Link>
        ) : (
          <span className="headerIconPlaceholder" aria-hidden="true" />
        )}
      </div>

      <div className="appHeaderDetails">
        {user.playerName && <p>{user.playerName}</p>}
        {user.league_name && <p>League: {user.league_name}</p>}
      </div>
    </header>
  );
};

export default Header;
