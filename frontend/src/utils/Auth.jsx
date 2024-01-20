import checkResponse from "./checkResponse";

export const BASE_URL = 'https://auth.nomoreparties.co';

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
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({email: email, password: password})
  })
}; 

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  })
};