function Register() {
  return (
    <div className="sign">
      <form className="sign__form">
        <h2 className="sign__title">Регистрация</h2>
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
        <button className="sign__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__paragraph">
        Уже зарегистрированы?&ensp;
        <a href="/sign-in" className="sign__link">
          Войти
        </a>
      </p>
    </div>
  );
}

export default Register;
