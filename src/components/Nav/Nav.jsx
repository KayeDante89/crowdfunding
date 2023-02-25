import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
  const { loggedIn, setLoggedIn } = props;

  const handleClick = () => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <nav>
      <div className="nav-links">
        <Link className="nav-btn" to="/">
          Home
        </Link>
        <Link className="nav-btn" to="/project">
          Projects
        </Link>
        <img className="logo-img" src="src/images/logo.png" />
        {loggedIn && (
          <Link className="nav-btn" to="/create-project">
            Create Project
          </Link>
        )}

        {!loggedIn && (
          <Link className="nav-btn" to="/create-account">
            Sign Up
          </Link>
        )}
        {!loggedIn && (
          <Link className="nav-btn" to="/login">
            Login
          </Link>
        )}
        {loggedIn && (
          <button className="logout-btn" onClick={handleClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Nav;
