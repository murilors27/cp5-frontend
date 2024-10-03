import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todo-caio.azurewebsites.net',
});

export default api;
