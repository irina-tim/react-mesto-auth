import { NavLink, useLocation } from "react-router-dom";

function Header({ loggedIn }) {
  const currentLocation = useLocation();

  return (
    <header className="header page__header">
      <div className="header__logo"></div>
      <NavLink className="header__link" to="/sign-in">
        Войти
      </NavLink>
    </header>
  );
}

export default Header;
