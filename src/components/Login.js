function Login() {
  return (
    <div className="sign">
      <form className="sign__form">
        <h2 className="sign__title">Вход</h2>
        <input
          className="sign__input"
          type="email"
          name="email"
          aria-label="Электронная почта"
          placeholder="Email"
          required
        ></input>
        <input
          className="sign__input"
          name="password"
          aria-label="Пароль"
          placeholder="Пароль"
          minLength="5"
          maxLength="15"
          required
        ></input>
        <button type="submit" className="sign__submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
