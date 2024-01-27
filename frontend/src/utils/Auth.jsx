import checkResponse from "./checkResponse";

export const BASE_URL = 'https://api.mesto.rafael.nomoredomainsmonster.ru';
// export const BASE_URL = 'https://localhost:3000';

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export const validateResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(
        `Упс, сервер ответил ошибкой: ${res.status}, ${res.message}`
      );
};

export const register = (email, password) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    // credentials: 'include',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({email: email, password: password})
  }).then(validateResponse)
}; 


export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  }).then(validateResponse)
}; 

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
      method: "GET",
      // credentials: 'include',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  }).then(validateResponse)
};