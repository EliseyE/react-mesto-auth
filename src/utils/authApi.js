import { BASE_URL } from "./constants";

function responceProcessing(res) {
  if(res.ok)
    return res;
  return Promise.reject(res);
};

async function makeRequset(url, method, data, token) {

  const headers = {
    "Content-Type": "application/json",
  };

  if(token !== undefined)
    headers['Authorization'] = `Bearer ${token}`;

  const config = {
    method,
    headers
  };

  if(data !== undefined)
    config.body = JSON.stringify(data);

  try {
    const res = await fetch(`${BASE_URL}${url}`, config);
    const resres = responceProcessing(res);
    return resres;
  } catch (err) {
    console.log(err);
  }

};

 export const register = (data) => {
  return makeRequset('/signup', 'POST', data, undefined);
};

export const authorize = (data) => {
  return makeRequset('/signin', 'POST', data, undefined);
};

export const getContent = (token) => {
  return makeRequset('/users/me', 'GET', undefined, token);
};



// first version of authApi
// export const register = (data) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//   .then(res => { return responceProcessing(res) })
// };


// export const authorize = (data) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//   .then(res => { return responceProcessing(res) })
// };


// export const getContent = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization" : `Bearer ${token}`
//     }
//   })
//   .then(res => { return responceProcessing(res) })
// };
