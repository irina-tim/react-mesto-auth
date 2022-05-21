export const BASE_URL = "https://auth.nomoreparties.co";

const checkResponse = (res) => {
  if (res.ok) {
    console.log(res);
    return res.json();
  }
  return res.json().then((data) => {
    throw new Error(data.message);
  });
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(checkResponse);
};
