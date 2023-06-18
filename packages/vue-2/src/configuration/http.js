// custom your own http
import axios from 'axios';

const http = axios.create({});
http.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(/*handle error*/)
);
http.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    if (status === 200) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(/*handle error*/);
    }
  },
  (error) => Promise.reject(/*handle error*/)
);

export default {
  install(app) {
    app.prototype.$http = http;
  }
};
export const $http = http;
