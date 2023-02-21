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
      <div className="site-title">
        <h1>Love Ledger</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/project">Project</Link>
        {!loggedIn && <Link to="/login">Login</Link>}
        {loggedIn && <button onClick={handleClick}>Log Out</button>}
      </div>
    </nav>
  );
}

export default Nav;
