import { useLocation } from "react-router-dom";

function Header({ loggedIn, ...props }) {
  const location = useLocation();
  function handleClick() {
    loggedIn
      ? props.handleSignOut()
      : location.pathname === "/sign-up"
      ? props.navigateToLogin()
      : props.navigateToRegister();
  }

  return (
    <header className="header page__header">
      <div className="header__logo"></div>
      <div className="header__group">
        <p className="header__user">
          {loggedIn && props.userData && props.userData.email}
        </p>
        <button className="header__link" onClick={handleClick}>
          {loggedIn
            ? "Выйти"
            : location.pathname === "/sign-up"
            ? "Войти"
            : "Регистрация"}
        </button>
      </div>
    </header>
  );
}

export default Header;
