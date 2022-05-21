import { useState } from "react";

function Register({ handleRegister }) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });
  //const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = formParams;
    handleRegister({ email, password }).catch((err) => {
      //setIsError(true);
      console.log(err.message);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="sign">
      <form className="sign__form" onSubmit={handleSubmit}>
        <h2 className="sign__title">Регистрация</h2>
        <input
          className="sign__input"
          type="email"
          name="email"
          aria-label="Электронная почта"
          placeholder="Email"
          required
          onChange={handleChange}
        ></input>
        <input
          className="sign__input"
          name="password"
          aria-label="Пароль"
          placeholder="Пароль"
          minLength="5"
          maxLength="15"
          required
          onChange={handleChange}
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
