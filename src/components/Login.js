import { useState } from "react";

function Login({ handleLogin }) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = formParams;
    handleLogin({ email, password }).catch((err) => {
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
        <h2 className="sign__title">Вход</h2>
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
        <button type="submit" className="sign__submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
