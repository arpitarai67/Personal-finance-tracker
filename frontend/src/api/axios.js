import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://personal-finance-tracker-bvep.onrender.com/api',
  withCredentials: true,
});

export default instance;
