const BASE_URL = 'https://auth.nomoreparties.co';




export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => { return responceProcessing(res) })
};

function responceProcessing(res) {
  if(res.ok)
    return res;
  return Promise.reject(res);
};
