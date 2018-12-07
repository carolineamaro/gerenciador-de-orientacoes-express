import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:3333/app',
});

export default api;
