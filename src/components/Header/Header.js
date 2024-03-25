import { Link } from "react-router-dom";
import "./Header.scss"

const Header = () => {
  return (
    <div className="header">
      <span>STOIC</span>
      <div className="header__links">
      <Link to="/" className="header__link">Main</Link>
        <Link to="/exercises" className="header__link">Exercises</Link>
        <Link to="/challenges" className="header__link">Challenges</Link>
        <Link to="/profile" className="header__link">Profile</Link>
      </div>
    </div>
  );
};

export default Header;
