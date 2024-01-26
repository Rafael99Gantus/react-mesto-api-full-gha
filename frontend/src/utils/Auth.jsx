import checkResponse from "./checkResponse";

export const BASE_URL = 'https://api.mesto.rafael.nomoredomainsmonster.ru';
// export const BASE_URL = 'https://localhost:3000';

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export const register = (email, password) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({email: email, password: password})
  })
}; 


export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  })
}; 

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  })
};