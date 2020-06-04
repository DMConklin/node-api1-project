import axios from 'axios';

export const api = (url, method, dataHandler, data = {}) => {
    axios({
      method: method,
      url: `http://localhost:8080/api${url}`,
      data: {
        ...data
      }
    })
    .then(res => {
      dataHandler(res.data);
    })
    .catch(err => console.log(err))
  }