import axios from 'axios';

const baseURL = 'http://127.0.0.1:3003/api/';

const request = axios.create({
  baseURL,
  timeout: 5000,
});

export default request;
