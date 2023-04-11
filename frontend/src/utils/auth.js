const BASE_URL = 'https://auth.nomoreparties.co';

function handleCorrectResponse(response) {
  if(response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const signin = async ({email, password}) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    headers: {'Content-Type':'application/json'},
    method: 'POST',
    body: JSON.stringify({
      "password": password,
      "email": email,
    })
  });
  if(response.status === 400) {
    return Promise.reject("Error 400 - Не передано одно из полей!")
  }
  if(response.status === 401) {
    return Promise.reject("Error 401 - Пользователь с данным email не найден или пароль введен не верно")
  }
  return handleCorrectResponse(response);
}

export const signup = async ({email, password}) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    headers: {'Content-Type':'application/json'},
    method: 'POST',
    body: JSON.stringify({
      "password": password,
      "email": email,
    })
  });
  if(response.status === 400) {
    return Promise.reject("Error 400 - Некорректно заполнено одно из полей!")
  }
  return handleCorrectResponse(response);
}

export const checkAuth = async (jwt) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    },
    method: 'GET',
  });
  if(response.status === 400) {
    return Promise.reject("Error 400 - Токен не передан или передан не в том формате!");
  }
  if(response.status === 401) {
    return Promise.reject("Error 401 - Переданный токен некорректен!");
  }
  return handleCorrectResponse(response);
}