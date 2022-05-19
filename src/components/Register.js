function Register() {
  return (
    <form>
      <h2>Регистрация</h2>
      <input
        type="email"
        name="email"
        aria-label="Электронная почта"
        placeholder="Email"
        required
      ></input>
      <input
        name="password"
        aria-label="Пароль"
        placeholder="Пароль"
        minLength="5"
        maxLength="15"
        required
      ></input>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default Register;
