import { NavLink, useLocation } from "react-router-dom";

function Header({ loggedIn, ...props }) {
  const currentLocation = useLocation();
  function handleClick() {
    loggedIn ? props.handleSignOut() : props.navigateToLogin();
  }

  return (
    <header className="header page__header">
      <div className="header__logo"></div>
      <button className="header__link" onClick={handleClick}>
        {loggedIn ? "Выйти" : "Войти"}
      </button>
    </header>
  );
}

export default Header;

//to={`${loggedIn ? "/sign-up" : "/sign-in"}`}
