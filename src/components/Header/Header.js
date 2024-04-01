import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <span className="header__logo">STOIC</span>
        <div className="header__links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'header__link active' : 'header__link'}>
            Main
          </NavLink>
          <NavLink to="/exercises" className={({ isActive }) => isActive ? 'header__link active' : 'header__link'}>
            Exercises
          </NavLink>
          <NavLink to="/challenges" className={({ isActive }) => isActive ? 'header__link active' : 'header__link'}>
            Challenges
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'header__link active' : 'header__link'}>
            Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
