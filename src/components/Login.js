import { useState } from "react";

function Login({ handleLogin }) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formParams;
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
          value={formParams.email}
        ></input>
        <input
          className="sign__input"
          name="password"
          type="password"
          aria-label="Пароль"
          placeholder="Пароль"
          minLength="5"
          maxLength="15"
          required
          onChange={handleChange}
          value={formParams.password}
        ></input>
        <button type="submit" className="sign__submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
